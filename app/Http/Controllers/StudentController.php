<?php

namespace App\Http\Controllers;

use App\Models\Entrant;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $model = $request->boolean('candidates')
                            ? Entrant::whereDoesntHave('resmi')
                            : Student::with('profil:id,nama,nik');
        return Inertia::render('Student', [
            'candidates' => $request->boolean('candidates'),
            'page' => $model->simplePaginate($request->query('per_page', 15)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $peserta = $request->validate([
            'id' => 'nullable|regex:/^[0-9]+$/',
            'nik' => 'required|regex:/^[0-9]{16}$/|unique:students|exists:entrants',
        ]);
        $peserta['tahun'] = \Illuminate\Support\Carbon::now()->year;
        Student::create($peserta);
        return back(303);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        $student->profil;
        return Inertia::render('Student/Index', ['current' => $student]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student)
    {
        $student->delete();
        $student->profil->delete();
        return back(303);
    }
}
