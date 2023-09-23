import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import SavedExerciseList from "../models/exerciseModel.js";

// @description   User can save an exercise to saved exercise list
// @route         POST /api/users/workoutdashboard
// @access        Private - can access URL only with token after logging in
const saveExercises = asyncHandler (async (request, response) => {

  // Check for user credentials with logic in userModel
  const user = await User.findById(request.user._id);

  if (user) {
    const id = request.params._id;

    // Second security measure to check user is saving exercise to their account
    if (request.user._id == id) {
      const exerciseId = request.body.exercise.exerciseId;
      const name = request.body.exercise.name;
      const bodyPart = request.body.exercise.bodyPart;
      const target = request.body.exercise.target;
      const secondaryMuscles = request.exercise.secondaryMuscles;
      const equipment = request.body.exercise.equipment;
      const gifUrl = request.body.exercise.gifUrl;
      const instructions = request.body.exercise.instructions;

      const saveExerciseExist = await SavedExerciseList.findOne({
        user: id,
        exerciseId: request.body.exerciseId,
      });

      if (saveExerciseExist === null) {
        const newSaveExercise = new SavedExerciseList({
          exerciseId: exerciseId,
          name: name,
          bodyPart: bodyPart,
          target: target,
          secondaryMuscles: secondaryMuscles,
          equipment: equipment,
          gifUrl: gifUrl,
          instructions: instructions,
          user: id,
        });

        newSaveExercise.save().then(
          response.status(201).json({
            message: "New exercise successfully saved",
          })
        );
      } else {
        response.status(400);
        throw new Error("Exercise is already saved");
      }
    } else {
      response.status(403);
      throw new Error("Forbidden Access");
    } 
  } else {
    response.status(401);
    throw new Error("Unauthorized Access");
  }
});

// @description   User can update saved exercise 
// @route         PUT /api/users/workoutdashboard
// @access        Private - can access URL only with token after logging in
const updateSavedExercises = asyncHandler (async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    const id = request.params._id;

    if (request.user._id == id) {
      const { totalSets, totalReps } = request.body.exercise;

      const filter = { user: id };
      const update = {};

      if (totalSets !== undefined) {
        update.totalSets = totalSets;
      }

      if (totalReps !== undefined) {
        update.totalReps = totalReps;
      }

      await SavedExerciseList.updateOne(filter, { $set: update });

      const savedExercise = await SavedExerciseList.find({ user: id });
      
      response.status(200).json({ savedExercise });
      }  else {
      response.status(403);
      throw new Error("Forbidden Access");
    } 
  } else {
    response.status(401);
    throw new Error("Unauthorized Access");
  }
});

// @description   User can update saved exercise 
// @route         GET /api/users/workoutdashboard
// @access        Private - can access URL only with token after logging in
const fetchSavedExercises = asyncHandler (async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    const id = request.params._id;

    if (request.user._id == id) {
      const savedExercises = await SavedExerciseList.find({ user: id }).sort({ exerciseId: 1 });
      
      response.status(200).json({ savedExercises });
      }  else {
      response.status(403);
      throw new Error("Forbidden Access");
    } 
  } else {
    response.status(401);
    throw new Error("Unauthorized Access");
  }
});

// @description   User can delete saved exercise 
// @route         DELETE /api/users/workoutdashboard
// @access        Private - can access URL only with token after logging in
const deleteSavedExercises = asyncHandler (async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    const id = request.params._id;
    const list = await SavedExerciseList.findOne({ user: id })

    if (request.user._id == list.user) {
      await SavedExerciseList.findByIdAndDelete({ exerciseId });
      
      response.status(200).json({
        message: "Saved exercise successfully deleted",
      });
      }  else {
      response.status(403);
      throw new Error("Forbidden Access");
    } 
  } else {
    response.status(401);
    throw new Error("Unauthorized Access");
  }
});

export {
  saveExercises,
  updateSavedExercises,
  fetchSavedExercises,
  deleteSavedExercises,
};