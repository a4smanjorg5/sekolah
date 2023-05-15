<?php

namespace App\Http\Controllers;

use App\Models\Entrant;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class EntrantController extends Controller
{
    public function create(Request $request)
    {
        return $request->user() ?
            Inertia::render('PPDB/Create', [
                'page' => Entrant::whereDoesntHave('resmi')->orderBy('id')->simplePaginate($request->query('per_page', 15)),
            ]) : Inertia::render('PPDB/Register');
    }

    public function edit($nik)
    {
        return $this->show($nik, true);
    }

    public function show($nik, $canEdit = false)
    {
        if (!preg_match('/^[0-9]{16}$/', $nik))
            abort(404);
        $this->preprocess();
        $props = Entrant::with('resmi')->where('nik', $nik)->first();
        if (!$props) {
            if (!$canEdit) abort(404);
            $props = ['nik' => $nik];
        }
        if (!$canEdit)
            $props['nis'] = Student::where('nik', $nik)->count() ? 0 : Student::max('id') + 1;
        return Inertia::render('PPDB/' . ($canEdit ? 'Register' : 'Show'), $props);
    }

    public function store(Request $request)
    {
        $this->preprocess();
        $request->validate([
            'nik' => 'required|regex:/^[0-9]{16}$/',
        ]);
        $validator = [
            'nik' => 'required',
            'nama' => 'required|string',
            'jk' => 'required|regex:/^[lp]$/',
            't4_lahir' => 'required|string|max:255',
            'tgl_lahir' => 'required|regex:/^[0-9]{3,}-[0-9]{2}-[0-9]{2}$/',
            'agama' => ['required', 'regex:/^(?:islam|protestan|katolik|buddha|hindu)$/'],
            'alamat' => 'required|string|max:255',
            'nama_ayah' => 'required|string|max:255',
            'ayah_masih_hidup' => 'required|regex:/^[01]$/',
            'telp_ayah' => 'exclude_if:ayah_masih_hidup,0|regex:/^08[1-9][0-9]{5,11}$/',
            'nik_ibu' => 'exclude_if:ayah_masih_hidup,0|regex:/^[0-9]{16}$/',
            'agama_ibu' => ['exclude_if:ayah_masih_hidup,0', 'regex:/^(?:islam|protestan|katolik|buddha|hindu)$/'],
            'kerja_ayah' => 'exclude_if:ayah_masih_hidup,0|exclude_unless:kerja_wali,null|required_without_all:kerja_ibu,kerja_wali|string|max:255',
            'hasil_ayah' => 'exclude_if:ayah_masih_hidup,0|exclude_unless:hasil_wali,null|required_without_all:hasil_ibu,hasil_wali|gt:0',
            'nama_ibu' => 'required|string|max:255',
            'ibu_masih_hidup' => 'required|regex:/^[01]$/',
            'telp_ibu' => 'exclude_if:ibu_masih_hidup,0|regex:/^08[1-9][0-9]{5,11}$/',
            'nik_ibu' => 'exclude_if:ibu_masih_hidup,0|regex:/^[0-9]{16}$/',
            'agama_ibu' => ['exclude_if:ibu_masih_hidup,0', 'regex:/^(?:islam|protestan|katolik|buddha|hindu)$/'],
            'kerja_ibu' => 'exclude_if:ibu_masih_hidup,0|exclude_unless:kerja_wali,null|required_without_all:kerja_ayah,kerja_wali|string|max:255',
            'hasil_ibu' => 'exclude_if:ibu_masih_hidup,0|exclude_unless:hasil_wali,null|required_without_all:hasil_ibu,hasil_wali|gt:0',
            'nama_wali' => 'string|max:255',
            'nik_wali' => 'regex:/^[0-9]{16}$/',
            'agama_wali' => ['regex:/^(?:islam|protestan|katolik|buddha|hindu)$/'],
            'telp_wali' => 'regex:/^08[1-9][0-9]{5,11}$/',
            'kerja_wali' => 'string|max:255',
            'hasil_wali' => 'gt:0',
            'alamat_wali' => 'required|string|max:255',
        ];
        $wali = array_reduce($request->only([
            'nama_wali', 'telp_wali', 'kerja_wali', 'hasil_wali',
        ]), function($carry, $item) {
            return $carry || $item;
        });
        if (!array_reduce($request->only([
            'ayah_masih_hidup', 'ibu_masih_hidup',
        ]), function($carry, $item) {
            return $carry || $item;
        }) || $wali) {
            $validator['nama_wali'] = 'required|' . $validator['nama_wali'];
            $validator['nik_wali'] = 'required|' . $validator['nik_wali'];
            $validator['agama_wali'] = 'required|' . $validator['agama_wali'];
            $validator['telp_wali'] = 'required|' . $validator['telp_wali'];
            $validator['kerja_wali'] = 'required|' . $validator['kerja_wali'];
            $validator['hasil_wali'] = 'required|' . $validator['hasil_wali'];
        }
        $validator = Validator::make($request->except(['id']), $validator);
        if ($validator->fails()) {
            $r = redirect(sprintf('%s/%s/edit', url()->current(), $request->input('nik')));
            if (url()->previous() != url()->current())
                return $r->withErrors($validator);
            return $r;
        }
        $data = array_map('strtoupper', $validator->validated());
        Entrant::upsert($data, ['nik'], array_keys($data));
        return redirect(route(sprintf('%s.show', $request->user() ? 'ppdb' : 'register'), [
            ($request->user() ? 'ppdb' : 'register') => $request->input('nik'),
        ]), 303);
    }

    protected function preprocess()
    {
        if (Student::where('nik', request()->input('nik'))->count())
            abort(403);
    }
}
