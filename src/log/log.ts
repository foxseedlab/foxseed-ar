export function sendEnterLog(
  guestName: string,
  deviceInnerWidth: number,
  deviceInnerHeight: number,
  userAgent: string,
) {
  fetch('/enter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      guestName,
      deviceInnerWidth,
      deviceInnerHeight,
      userAgent,
    }),
  });
}

export function sendMarkerFoundLog(
  guestName: string,
  markerId: string,
  deviceInnerWidth: number,
  deviceInnerHeight: number,
  userAgent: string,
) {
  fetch('/marker_found', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      guestName,
      markerId,
      deviceInnerWidth,
      deviceInnerHeight,
      userAgent,
    }),
  });
}

export function sendCharacterClickLog(
  guestName: string,
  contentId: string,
  deviceInnerWidth: number,
  deviceInnerHeight: number,
  userAgent: string,
) {
  fetch('/character_click', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      guestName,
      contentId,
      deviceInnerWidth,
      deviceInnerHeight,
      userAgent,
    }),
  });
}
