// Import necessary modules and functions
import express from "express";
import { getAll, get, add, replace, remove } from "../data/event.js";
import { isValidText, isValidDate, isValidImageUrl } from "../util/validation.js";

// Create a new Express router
const router = express.Router();

// GET all events
router.get("/", async (req, res, next) => {
  try {
    const events = await getAll();
    // Uncomment if you want to simulate a delay
    // setTimeout(() => {
    //   res.json({ events: events });
    // }, 1500);
    res.json({ events: events });
  } catch (error) {
    next(error);
  }
});

// GET a specific event by ID
router.get("/:id", async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event });
  } catch (error) {
    next(error);
  }
});

// POST (add) a new event
router.post("/", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title.";
  }
  if (!isValidText(data.description)) {
    errors.description = "Invalid description.";
  }
  if (!isValidDate(data.date)) {
    errors.date = "Invalid date.";
  }
  if (!isValidImageUrl(data.image)) {
    errors.image = "Invalid image.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "Event saved.", event: data });
  } catch (error) {
    next(error);
  }
});

// PATCH (update) an event by ID
router.patch("/:id", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title.";
  }
  if (!isValidText(data.description)) {
    errors.description = "Invalid description.";
  }
  if (!isValidDate(data.date)) {
    errors.date = "Invalid date.";
  }
  if (!isValidImageUrl(data.image)) {
    errors.image = "Invalid image.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "Event updated.", event: data });
  } catch (error) {
    next(error);
  }
});

// DELETE an event by ID
router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Event deleted." });
  } catch (error) {
    next(error);
  }
});

// Export the router as the default export
export default router;
