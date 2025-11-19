import { useRef } from 'react';

export const useSectionRefs = () => {
  return {
    introRef: useRef(null),
    statsRef: useRef(null),
    historyRef: useRef(null),
    visitsRef: useRef(null),
    galleryRef: useRef(null),
    visor360Ref: useRef(null),
    testimonialsRef: useRef(null),
    mapRef: useRef(null),
    contactRef: useRef(null)
  };
};
