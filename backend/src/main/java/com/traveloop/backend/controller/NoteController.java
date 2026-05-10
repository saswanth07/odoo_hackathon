package com.traveloop.backend.controller;

import com.traveloop.backend.dto.ApiResponse;
import com.traveloop.backend.dto.TripNoteDTO;
import com.traveloop.backend.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/trips/{tripId}/notes")
    public ResponseEntity<ApiResponse<TripNoteDTO>> createNote(@PathVariable Long tripId, @Valid @RequestBody TripNoteDTO request) {
        TripNoteDTO response = noteService.createNote(tripId, request);
        return new ResponseEntity<>(new ApiResponse<>(true, "Note created successfully", response), HttpStatus.CREATED);
    }

    @GetMapping("/trips/{tripId}/notes")
    public ResponseEntity<ApiResponse<List<TripNoteDTO>>> getNotesByTrip(@PathVariable Long tripId) {
        List<TripNoteDTO> response = noteService.getNotesByTrip(tripId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Notes retrieved successfully", response));
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Note deleted successfully", null));
    }
}
