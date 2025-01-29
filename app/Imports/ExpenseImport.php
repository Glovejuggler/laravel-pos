<?php

namespace App\Imports;

use Carbon\Carbon;
use App\Models\Expense;
use Illuminate\Support\Collection;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ExpenseImport implements ToCollection, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        foreach ($collection as $row)
        {
            Expense::create([
                'item' => $row['item'],
                'amount' => $row['amount'],
                'type' => $row['type'],
                'created_at' => Carbon::parse(Date::excelToDateTimeObject($row['date']))
            ]);
        }
    }
}
