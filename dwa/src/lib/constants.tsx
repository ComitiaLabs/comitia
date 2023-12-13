import { BrainCircuit, Fingerprint, HardDrive, HeartHandshake } from 'lucide-react';

export const features = [
  {
    name: 'Instant Help',
    description: 'Get help when you need it, wherever, instantly from our AI powered chatbot.',
    icon: HeartHandshake
  },
  {
    name: 'Own your data',
    description:
      'All your conversations and health records are stored in your own database (your DWN). You are free to do as you wish with it at anytime',
    icon: HardDrive
  },
  {
    name: 'Self Learning',
    description:
      'Your assistant is always learning from you and remembers all the information you tell it so it can give you better advice in the future.',
    icon: BrainCircuit
  },
  {
    name: 'Advanced security',
    description:
      'No one can access your data without your permission. Your data is encrypted and stored in your own database.',
    icon: Fingerprint
  }
];

export const faqs = [
  {
    question: 'Is my data stored with you?',
    answer:
      'Your messages are not stored with us and are only used to generate a response for each question. The actual data is stored in your DWN.'
  },
  {
    question: 'Can anyone see my requests?',
    answer: "No, only you can see your requests. We don't store any of your data."
  },
  {
    question: 'Can I continue my treatment outside the app?',
    answer:
      'Yes, you can export your records at any time. The export will be FHIR spec compliant so you can take it to any hospital you choose to.'
  },
  {
    question: 'Why do you not accept an email/password?',
    answer:
      'We are built on decentralized web technologies popularized by the Web5 project. Who needs passwords when you have a DWN?'
  },
  {
    question: 'Will my information be shared with third parties?',
    answer:
      'No. We do not share your information with anyone. We do not operate a business model that requires us to do so and our code is open source so you can verify this yourself.'
  }
];
