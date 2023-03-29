<?php

namespace App\Http\Controllers;

use App\Models\Entrant;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class EntrantController extends Controller
{
    public function create()
    {
        return Inertia::render('PPDB/Register');
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
        $props = Entrant::find($nik);
        if (!$props) {
            if (!$canEdit) abort(404);
            $props = ['nik' => $nik];
        }
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
            'nama_ibu' => 'required|string|max:255',
            'ibu_masih_hidup' => 'required|regex:/^[01]$/',
            'nama_wali' => 'string|max:255',
            'telp_wali' => 'regex:/^08[1-9][0-9]{5,11}$/',
            'alamat_wali' => 'string|max:255',
        ];
        if ($request->boolean('ayah_masih_hidup'))
            $validator['telp_ayah'] = 'required|regex:/^08[1-9][0-9]{5,11}$/';
        if ($request->boolean('ibu_masih_hidup'))
            $validator['telp_ibu'] = 'required|regex:/^08[1-9][0-9]{5,11}$/';
        if (!$request->boolean('ayah_masih_hidup') && !$request->boolean('ibu_masih_hidup')) {
            $validator['nama_wali'] = 'required|' . $validator['nama_wali'];
            $validator['telp_wali'] = 'required|' . $validator['telp_wali'];
        }
        $validator = Validator::make($request->all(), $validator);
        if ($validator->fails()) {
            $r = redirect(sprintf('%s/%s/edit', url()->current(), $request->input('nik')));
            if (url()->previous() != url()->current())
                return $r->withErrors($validator);
            return $r;
        }
        $data = array_map('strtoupper', $validator->validated());
        Entrant::upsert($data, ['nik'], array_keys($data));
        return redirect(route('ppdb') . '/' .$request->input('nik'));
    }

    protected function preprocess()
    {
        if (Student::where('profil', request()->input('nik'))->count())
            abort(403);
    }
}
