<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'item' => fake()->word(),
            'type' => fake()->randomElement(['Net', 'COGS']),
            'amount' => fake()->numberBetween(45, 6500),
            'created_at' => fake()->dateTimeBetween('-4 week', 'now'),
        ];
    }
}
