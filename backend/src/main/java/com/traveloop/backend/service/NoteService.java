package com.traveloop.backend.service;

import com.traveloop.backend.dto.TripNoteDTO;
import com.traveloop.backend.entity.Trip;
import com.traveloop.backend.entity.TripNote;
import com.traveloop.backend.exception.ResourceNotFoundException;
import com.traveloop.backend.repository.TripNoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

    private final TripNoteRepository noteRepository;
    private final TripService tripService;

    public NoteService(TripNoteRepository noteRepository, TripService tripService) {
        this.noteRepository = noteRepository;
        this.tripService = tripService;
    }

    public TripNoteDTO createNote(Long tripId, TripNoteDTO request) {
        Trip trip = tripService.getTripEntity(tripId);

        TripNote note = new TripNote();
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setTrip(trip);

        TripNote savedNote = noteRepository.save(note);
        return mapToResponse(savedNote);
    }

    public List<TripNoteDTO> getNotesByTrip(Long tripId) {
        return noteRepository.findByTripId(tripId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void deleteNote(Long noteId) {
        TripNote note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found"));
        noteRepository.delete(note);
    }

    private TripNoteDTO mapToResponse(TripNote note) {
        TripNoteDTO dto = new TripNoteDTO();
        dto.setId(note.getId());
        dto.setTitle(note.getTitle());
        dto.setContent(note.getContent());
        dto.setCreatedAt(note.getCreatedAt());
        dto.setTripId(note.getTrip().getId());
        return dto;
    }
}
