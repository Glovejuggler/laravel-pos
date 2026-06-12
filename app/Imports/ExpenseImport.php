<?php

namespace App\Imports;

use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ExpenseImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $collection)
    {
        foreach ($collection as $row) {
            Expense::create([
                'item' => $row['item'],
                'amount' => $row['amount'],
                'type' => $row['type'],
                'created_at' => Carbon::parse(Date::excelToDateTimeObject($row['date'])),
            ]);
        }
    }
}
