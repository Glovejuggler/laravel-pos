<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use App\Imports\ExpenseImport;
use Maatwebsite\Excel\Facades\Excel;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Expense/Index', [
            'expenses' => Expense::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function import(Request $request)
    {
        // dd($request);

        // $request->validate([
        //     'expenses.*.item' => 'required',
        //     'file' => 'required|mimes:xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        // ]);
        
        $expenses = Excel::toArray(new ExpenseImport, $request->file);

        return response()->json([
            'message' => 'File imported successfully',
            'data' => $expenses[0]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Expense/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        $request->validate([
            'expenses.*.item' => 'required',
            'expenses.*.amount' => 'required|numeric',
            'expenses.*.type' => 'required',
            'expenses.*.created_at' => 'required|date'
        ]);

        foreach ($request->expenses as $expense) {
            Expense::create($expense);
        }

        return redirect()->route('expenses.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        //
    }
}
