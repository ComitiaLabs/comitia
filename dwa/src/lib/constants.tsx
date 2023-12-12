import {
  BrainCircuit,
  Fingerprint,
  HardDrive,
  HeartHandshake,
} from 'lucide-react';

export const features = [
  {
    name: 'Instant Help',
    description:
      'Unlike traditional doctors you can get instant help from our AI powered chatbot.',
    icon: HeartHandshake,
  },
  {
    name: 'Own your own data',
    description:
      'All your data is stored in your own database (your DWN) so you are free to do anything with it at anytime',
    icon: HardDrive,
  },
  {
    name: 'Self Learning',
    description:
      'Your assistant is always learning from you and remembers all the information you tell it so it can give you better advice in the future.',
    icon: BrainCircuit,
  },
  {
    name: 'Advanced security',
    description:
      'Only your DID can grant you access to your messages. Even we cannot access your messages.',
    icon: Fingerprint,
  },
];

export const faqs = [
  {
    question: 'Is my data stored with you?',
    answer:
      'Your messages are not stored with us and are only used to generate a response for each question. The actual data is stored in your DWN.',
  },
  {
    question: 'Can anyone see my requests?',
    answer:
      "No, only you can see your requests. We don't store any of your data.",
  },
  {
    question: 'Can I show my records to a human doctor?',
    answer:
      'Yes, you can export your records at any time. The export will be FHIR spec compliant so you can take it to any hospital you choose to.',
  },
  {
    question: 'Why do you not accept an email/password?',
    answer:
      "We don't want to store any of your data to prevent any breach of your privacy.",
  },
];
