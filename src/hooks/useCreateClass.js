import { useState } from 'react';

import { ClassRoomsService } from '../services';

const useCreateClass = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createClass = async ({ name, sections, schedule, callbacks }) => {
    setIsCreating(true);

    let responseCode;
    let retrievedClass;

    try {
      const { status, data } = await ClassRoomsService.create({
        name,
        sections,
        schedule,
      });

      responseCode = status;
      retrievedClass = data;
    } catch (error) {
      responseCode = error.response.status;
    }

    switch (responseCode) {
      case 201:
        await callbacks.created({ retrievedClass });
        break;
      case 400:
        await callbacks.invalidFields();
        break;
      case 500:
        await callbacks.internalError();
        break;
      default:
    }

    setIsCreating(false);
  };

  return { isCreating, createClass };
};

export default useCreateClass;
