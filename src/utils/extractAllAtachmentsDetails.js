import { assetBaseUrl } from "../consts";

const extractAllAttachmentDetails = (stories) => {
  return stories?.primeStories.flatMap(story => story.attachment)?.map(d => {
    let newView = {
      ...d,
      url: `${assetBaseUrl}${d?.url}`,
      type: d?.mimeType,
      videoThumbnail: `${assetBaseUrl}${d?.thumbNail}`,
    };
    return newView;
  }) ?? [];
};

export default extractAllAttachmentDetails;