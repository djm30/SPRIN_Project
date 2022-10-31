import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import { useTextField } from "../../hooks";
import TextField from "../UI/TextField";
import FileUpload from "../UI/FileUpload";
import RadioButtons from "./RadioButtons";
import { DateTimeForm } from "./DateTimeForm";
import { eventTypes } from "./EventTypes";
import { useDispatch } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";
import { newEvent } from "../../reducers/eventReducer";
import {
  eventTileValidator,
  eventDescriptionValidator,
  meetingUrlValidator,
  eventbriteUrlValidator,
  addressLineOneValidator,
  addressLineTwoValidator,
  postCodeValidator,
  townCityValidator,
  dateTimeValidator,
} from "./EventValidationFunctions";

const EventForm = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const [eventType, setEventType] = useState(eventTypes.PHYSICAL);

  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState("");

  const [dateTime, setDateTime] = useState("");
  const [dateTimeError, setDateTimeError] = useState("");

  const [
    eventTitle,
    eventTitleReset,
    eventTitleError,
    isEventTitleValid,
    eventTitleInputParams,
  ] = useTextField(eventTileValidator);

  const [
    eventDescription,
    eventDescriptionReset,
    eventDescriptionError,
    isEventDescriptionValid,
    eventDescriptionInputParams,
  ] = useTextField(eventDescriptionValidator);

  const [
    meetingUrl,
    meetingUrlReset,
    meetingUrlError,
    isMeetingUrlValid,
    meetingUrlInputParams,
  ] = useTextField(meetingUrlValidator);

  const [
    addressLineOne,
    addressLineOneReset,
    addressLineOneError,
    isAddressLineOneValid,
    addressLineOneInputParams,
  ] = useTextField(addressLineOneValidator);

  const [
    addressLineTwo,
    addressLineTwoReset,
    addressLineTwoError,
    isAddressLineTwoValid,
    addressLineTwoInputParams,
  ] = useTextField(addressLineTwoValidator);

  const [
    postCode,
    postCodeReset,
    postCodeError,
    isPostCodeValid,
    postCodeInputParams,
  ] = useTextField(postCodeValidator);

  const [
    townCity,
    townCityReset,
    townCityError,
    isTownCityValid,
    townCityInputParams,
  ] = useTextField(townCityValidator);

  const [
    eventbriteUrl,
    eventbriteUrlReset,
    eventbriteUrlError,
    isEventbriteUrlValid,
    eventbriteUrlInputParams,
  ] = useTextField(eventbriteUrlValidator);

  const validateAll = () => {
    // Assuming a valid state to begin with
    let isValid = true;

    // Checking if meeting url is valid
    if (eventType === eventTypes.ONLINE && !isMeetingUrlValid())
      isValid = false;
    // Checking validtiy of address is event is a physical event
    else if (eventType === eventTypes.PHYSICAL) {
      [
        isAddressLineOneValid,
        isAddressLineTwoValid,
        isPostCodeValid,
        isTownCityValid,
      ].forEach((validator) => {
        const isFieldValid = validator();
        // Only updating value of isValid if it is currently true
        if (isValid) isValid = isFieldValid;
      });
    }

    if (dateTimeValidator(dateTime)) {
      setDateTimeError(dateTimeValidator(dateTime));
      isValid = false;
    }
    [isEventTitleValid, isEventDescriptionValid, isEventbriteUrlValid].forEach(
      (validator) => {
        const isFieldValid = validator();
        // Only updating value of isValid if it is currently true
        if (isValid) isValid = isFieldValid;
      },
    );

    return isValid;
  };

  const resetAll = () => {
    eventTitleReset();
    eventDescriptionReset();
    meetingUrlReset();
    addressLineOneReset();
    addressLineTwoReset();
    postCodeReset();
    townCityReset();
    setDateTime("");
    setDateTimeError("");
    eventbriteUrlReset();
    setImage(undefined);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      dispatch(setNotification("Please fill in all fields correctly", true));
    } else {
      const formData = new FormData();
      formData.append("title", eventTitle);
      formData.append("description", eventDescription);
      formData.append("location", eventType);
      if (eventType === eventTypes.PHYSICAL) {
        formData.append(
          "address",
          JSON.stringify({
            addressLineOne,
            addressLineTwo,
            postCode,
            townCity,
          }),
        );
      } else {
        formData.append("address", meetingUrl);
      }
      formData.append("eventbriteUrl", eventbriteUrl);
      if (!imageError && image) formData.append("file", image);

      dispatch(newEvent(formData));
      dispatch(setNotification("Creating new resource!"));
      resetAll();
    }
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="mx-4 w-[600px] h-fit px-3 sm:px-6 py-4 overflow-hidden font-body ß -translate-y-2"
    >
      <h3 className="text-lg text-center mx-2 md:text-2xl text-darkblue-100 font-bold">
        Create An Event
      </h3>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        className="mt-10 md:space-y-3"
      >
        {/* Event Title */}
        <TextField error={eventTitleError} inputParams={eventTitleInputParams}>
          Event Title
        </TextField>
        {/* Event Description */}
        <TextField
          error={eventDescriptionError}
          inputParams={eventDescriptionInputParams}
        >
          Event Description
        </TextField>
        {/* EVENT TYPE RADIAL BUTTONS */}

        {/* DIFFERENT FORM DEPENDING ON WHAT RESOURCE HAS BEEN CHOSEN */}
        <RadioButtons
          value={eventType}
          setValue={setEventType}
          values={eventTypes}
        />
        <div>
          {eventType === eventTypes.ONLINE ? (
            <TextField
              error={meetingUrlError}
              inputParams={meetingUrlInputParams}
            >
              Meeting Url
            </TextField>
          ) : (
            <>
              <TextField
                error={addressLineOneError}
                inputParams={addressLineOneInputParams}
              >
                Address Line 1
              </TextField>
              <TextField
                error={addressLineTwoError}
                inputParams={addressLineTwoInputParams}
              >
                Address Line 2
              </TextField>
              <TextField
                error={postCodeError}
                inputParams={postCodeInputParams}
              >
                Postcode
              </TextField>
              <TextField
                error={townCityError}
                inputParams={townCityInputParams}
              >
                Town/City
              </TextField>
            </>
          )}
        </div>
        <DateTimeForm
          setDateTime={setDateTime}
          setDateTimeError={setDateTimeError}
          error={dateTimeError}
        />
        <TextField
          error={eventbriteUrlError}
          inputParams={eventbriteUrlInputParams}
        >
          Eventbrite Link
        </TextField>
        <FileUpload
          label="Want to upload an image?"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          errorMessage={imageError}
          fileName={image ? image.name : ""}
        />
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
