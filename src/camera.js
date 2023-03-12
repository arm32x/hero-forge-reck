const ck = unsafeWindow.CK;

let orbitCameraPatched = false;
let cameraChangesToPrevent = 0;

const patchOrbitCamera = () => {
  Object.defineProperty(ck.orbitCamera, "preventCameraChanges", {
    get() {
      if (cameraChangesToPrevent > 0) {
        cameraChangesToPrevent--;
        return true;
      }
      return false;
    },
    set(value) {
      cameraChangesToPrevent = value ? Infinity : 0;
    },
  });
  orbitCameraPatched = true;
  console.debug("ReCK: Patched orbitCamera object");
};

export const preventNextChanges = (count) => {
  if (!orbitCameraPatched) {
    patchOrbitCamera();
  }
  if (count > cameraChangesToPrevent) {
    cameraChangesToPrevent = count;
  }
};
