import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import { useTextField } from "../../hooks";
import TextField from "../UI/TextField";
import FileUpload from "../UI/FileUpload";
import RadioButtons from "./RadioButtons";

const EventForm = ({ open, setOpen }) => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const eventTypes = {
    ONLINE: "ONLINE",
    PHYSICAL: "PHYSICAL",
  };

  const [eventType, setEventType] = useState(eventTypes.PHYSICAL);

  const [
    eventTitle,
    eventTitleReset,
    eventTitleError,
    isEventTitleValid,
    eventTitleInputParams,
  ] = useTextField(() => {});

  const [
    eventDescription,
    eventDescriptionReset,
    eventDescriptionError,
    isEventDescriptionValid,
    eventDescriptionInputParams,
  ] = useTextField(() => {});

  const [
    resourceUrl,
    resourceUrlReset,
    resourceUrlError,
    isResourceUrlValid,
    resourceUrlInputParams,
  ] = useTextField(() => {});

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="mx-4 w-[600px] md:max-h-[720px] h-fit px-3 sm:px-6 py-4 font-body overflow-y-scroll -translate-y-2"
    >
      <h3 className="text-lg text-center mx-2 md:text-2xl text-darkblue-100 font-bold">
        Add A Resource
      </h3>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className="mt-10 md:space-y-3"
      >
        {/* RESOURCE Title */}
        <TextField error={eventTitleError} inputParams={eventTitleInputParams}>
          Event Title
        </TextField>
        {/* RESOURCE DESCRIPTION */}
        <TextField
          error={eventDescriptionError}
          inputParams={eventDescriptionInputParams}
        >
          Event Description
        </TextField>
        {/* RESOURCE TYPE RADIAL BUTTONS */}

        {/* DIFFERENT FORM DEPENDING ON WHAT RESOURCE HAS BEEN CHOSEN */}
        <RadioButtons
          value={eventType}
          setValue={setEventType}
          values={eventTypes}
        />
        <div>
          <TextField>
            {eventType === eventTypes.ONLINE ? "Meeting Url" : "Address"}
          </TextField>
        </div>
        {/* SUBMIT BUTTON */}

        <div className="mx-2">
          <button className="w-full mt-4 bg-darkblue-100 text-white px-4 py-3 rounded-lg hover:bg-skyblue-200 transition-all">
            Add Event
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventForm;
