import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

export function addFlashMessage(payload) {
  return {
    type: ADD_FLASH_MESSAGE,
    payload
  };
}

export function deleteFlashMessage(payload) {
  return {
    type: DELETE_FLASH_MESSAGE,
    payload
  };
}
