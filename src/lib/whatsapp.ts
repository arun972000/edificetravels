import { site } from '../data/site';

/** Build a wa.me click-to-chat link with a pre-filled, URL-encoded message. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: () =>
    waLink(`Hi Edifice Travels, I'm planning a trip to India and would like to talk to a specialist.`),
  journey: (title: string, days: number) =>
    waLink(
      `Hi, I'm looking at the ${days}-day "${title}" journey on your website. We are [number] travellers thinking of [month]. Could you send a proposal?`,
    ),
  destination: (title: string) =>
    waLink(`Hi, I'd like to include ${title} in a private India journey. Could we talk about options?`),
  region: (title: string) =>
    waLink(`Hi, I'm interested in a private journey through ${title}. Could you suggest an itinerary?`),
  guide: (title: string) =>
    waLink(`Hi, I read your guide "${title}" and have a question about planning my trip.`),
};
