package com.traveloop.backend.service;

import com.traveloop.backend.dto.ActivityRequestDTO;
import com.traveloop.backend.dto.ActivityResponseDTO;
import com.traveloop.backend.entity.Activity;
import com.traveloop.backend.entity.Stop;
import com.traveloop.backend.exception.ResourceNotFoundException;
import com.traveloop.backend.repository.ActivityRepository;
import com.traveloop.backend.repository.StopRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final StopRepository stopRepository;

    public ActivityService(ActivityRepository activityRepository, StopRepository stopRepository) {
        this.activityRepository = activityRepository;
        this.stopRepository = stopRepository;
    }

    public ActivityResponseDTO createActivity(Long stopId, ActivityRequestDTO request) {
        Stop stop = stopRepository.findById(stopId)
                .orElseThrow(() -> new ResourceNotFoundException("Stop not found with id: " + stopId));

        Activity activity = new Activity();
        activity.setActivityName(request.getActivityName());
        activity.setCategory(request.getCategory());
        activity.setDescription(request.getDescription());
        activity.setEstimatedCost(request.getEstimatedCost());
        activity.setDuration(request.getDuration());
        activity.setPriorityLevel(request.getPriorityLevel());
        activity.setStop(stop);

        Activity savedActivity = activityRepository.save(activity);
        
        // update estimated stay cost
        updateStopEstimatedCost(stop);

        return mapToResponse(savedActivity);
    }

    public List<ActivityResponseDTO> getActivitiesByStop(Long stopId) {
        return activityRepository.findByStopId(stopId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ActivityResponseDTO updateActivity(Long activityId, ActivityRequestDTO request) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + activityId));

        activity.setActivityName(request.getActivityName());
        activity.setCategory(request.getCategory());
        activity.setDescription(request.getDescription());
        activity.setEstimatedCost(request.getEstimatedCost());
        activity.setDuration(request.getDuration());
        activity.setPriorityLevel(request.getPriorityLevel());

        Activity updatedActivity = activityRepository.save(activity);
        
        updateStopEstimatedCost(activity.getStop());

        return mapToResponse(updatedActivity);
    }

    public void deleteActivity(Long activityId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + activityId));
        Stop stop = activity.getStop();
        activityRepository.delete(activity);
        updateStopEstimatedCost(stop);
    }

    private void updateStopEstimatedCost(Stop stop) {
        List<Activity> activities = activityRepository.findByStopId(stop.getId());
        double total = activities.stream().mapToDouble(Activity::getEstimatedCost).sum();
        stop.setEstimatedStayCost(total);
        stopRepository.save(stop);
        
        // Similarly we should ideally update trip total cost here
    }

    public ActivityResponseDTO mapToResponse(Activity activity) {
        ActivityResponseDTO dto = new ActivityResponseDTO();
        dto.setId(activity.getId());
        dto.setActivityName(activity.getActivityName());
        dto.setCategory(activity.getCategory());
        dto.setDescription(activity.getDescription());
        dto.setEstimatedCost(activity.getEstimatedCost());
        dto.setDuration(activity.getDuration());
        dto.setPriorityLevel(activity.getPriorityLevel());
        dto.setStopId(activity.getStop().getId());
        return dto;
    }
}
