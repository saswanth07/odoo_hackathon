package com.traveloop.backend.controller;

import com.traveloop.backend.dto.ApiResponse;
import com.traveloop.backend.dto.BudgetResponseDTO;
import com.traveloop.backend.service.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trips/{id}")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping("/budget")
    public ResponseEntity<ApiResponse<BudgetResponseDTO>> getBudgetAnalysis(@PathVariable Long id) {
        BudgetResponseDTO response = budgetService.getBudgetAnalysis(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Budget analysis generated successfully", response));
    }

    @GetMapping("/optimize-budget")
    public ResponseEntity<ApiResponse<BudgetResponseDTO>> getBudgetOptimization(@PathVariable Long id) {
        BudgetResponseDTO response = budgetService.getBudgetAnalysis(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Budget optimization generated successfully", response));
    }
}
