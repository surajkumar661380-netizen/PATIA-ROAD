import { Track, Quote, MemoryPolaroid, InteractiveItem } from '../types';

export const PLAYLIST_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Patia Evening Acoustic (College Days)',
    artist: 'BBSR Hostel Jam Circle',
    album: 'Semester 5 Soundtrack',
    duration: 215,
    youtubeUrl: 'https://youtube.com/playlist?list=PL3ZQow2MhFvgv-40VFJqgqhkJGIbHJ-1q&si=9tL2REHxE7eamaHJ',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    category: 'Acoustic',
    vibe: 'Late night corridor jam after 3 AM Maggi'
  },
  {
    id: '2',
    title: 'Rain over Master Canteen & Kiit Square',
    artist: 'Bhubaneswar Monsoon Project',
    album: 'Odisha Retro Vibes',
    duration: 260,
    youtubeUrl: 'https://youtube.com/playlist?list=PL3ZQow2MhFvgv-40VFJqgqhkJGIbHJ-1q&si=9tL2REHxE7eamaHJ',
    coverImage: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=400&q=80',
    category: 'Monsoon',
    vibe: 'Watching rain drops from Khoka Tea Stall'
  },
  {
    id: '3',
    title: 'Auto Dada - Patia 20 Taka (Lo-Fi Drive)',
    artist: 'Ghatikia Beatmakers',
    album: 'Mo Bus Nostalgia',
    duration: 185,
    youtubeUrl: 'https://youtube.com/playlist?list=PL3ZQow2MhFvgv-40VFJqgqhkJGIbHJ-1q&si=9tL2REHxE7eamaHJ',
    coverImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80',
    category: 'Chill',
    vibe: 'Riding auto through Chandrasekharpur at sunset'
  },
  {
    id: '4',
    title: 'End-Sem Panic Attack (3 AM Guitar)',
    artist: 'Unit-4 Night Owls',
    album: 'Syllabus Unfinished',
    duration: 240,
    youtubeUrl: 'https://youtube.com/playlist?list=PL3ZQow2MhFvgv-40VFJqgqhkJGIbHJ-1q&si=9tL2REHxE7eamaHJ',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
    category: 'Hostel Jams',
    vibe: '12 hours left before Digital Electronics exam'
  },
  {
    id: '5',
    title: 'Puri Beach Sunset Roadtrip',
    artist: 'Dahibara Acoustic Collective',
    album: 'Odisha Memories Vol. 1',
    duration: 290,
    youtubeUrl: 'https://youtube.com/playlist?list=PL3ZQow2MhFvgv-40VFJqgqhkJGIbHJ-1q&si=9tL2REHxE7eamaHJ',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    category: 'Retro',
    vibe: 'Bunking Friday classes to ride to Puri with friends'
  }
];

export const NOSTALGIC_QUOTES: Quote[] = [
  {
    id: 'q1',
    text: 'Bhai, Raghu Dada pakhaku chala, Dahibara re tikie Dahi-Pani aau extra Piyaji maza aashiba!',
    author: 'CSE Batchmate',
    location: 'KIIT Square / Patia',
    time: '5:30 PM',
    tag: 'Food Mantra'
  },
  {
    id: 'q2',
    text: 'Auto Dada loud shout: "Patia 20 taka! Kiit Square 20 Taka! Jaldi aasa thiba!"',
    author: 'Auto Dada',
    location: 'Master Canteen Bus Stand',
    time: '8:15 AM',
    tag: 'Daily Commute'
  },
  {
    id: 'q3',
    text: '1:15 AM Hostel Room: 8 boys sitting on one mattress trying to understand 1-night syllabus from the topper.',
    author: 'Hostel Room 304',
    location: 'Ghatikia Campus',
    time: '1:15 AM',
    tag: 'Exam Night'
  },
  {
    id: 'q4',
    text: 'When monsoon hits Bhubaneswar, every college student magically converges at Khoka Tea Stall for Kulhad Chai.',
    author: 'Senior Bhaina',
    location: 'Outr Gate Khoka Stall',
    time: '6:00 PM',
    tag: 'Rain Mood'
  },
  {
    id: 'q5',
    text: 'CR on WhatsApp: "All guys please confirm mass bunk for tomorrow 2nd period lab!"',
    author: 'Class Representative',
    location: 'WhatsApp Group (Section B)',
    time: '11:45 PM',
    tag: 'College Bunk'
  },
  {
    id: 'q6',
    text: 'Fest night concert lights, cold winter breeze in BBSR, and whole campus chanting retro anthems together.',
    author: 'Annual Cultural Fest Memories',
    location: 'Open Air Theater',
    time: '9:00 PM',
    tag: 'Fest Magic'
  }
];

export const INTERACTIVE_DESK_ITEMS: InteractiveItem[] = [
  {
    id: 'dahibara_plate',
    name: 'Dahibara Aloo Dum',
    label: 'Dahibara Plate',
    soundKey: 'dahibara',
    description: 'The iconic Bhubaneswar student evening snack! Served with Sev, Piyaji & cold Dahi Pani.',
    iconName: 'UtensilsCrossed',
    detailModal: 'dahibara'
  },
  {
    id: 'kulhad_chai',
    name: 'Khoka Kulhad Tea',
    label: 'Tapri Chai',
    soundKey: 'chai',
    description: 'Boiling hot ginger tea served in clay pots near the college backgate stall.',
    iconName: 'Coffee',
    detailModal: 'tea_stall'
  },
  {
    id: 'student_id',
    name: 'College ID Card',
    label: 'Student Lanyard',
    soundKey: 'tape',
    description: 'Your passport to college gate entry, library access, and fest passes.',
    iconName: 'IdCard',
    detailModal: 'id_card'
  },
  {
    id: 'auto_keyring',
    name: 'Auto Rickshaw Model',
    label: 'Auto Dada "20 Taka"',
    soundKey: 'auto',
    description: 'Green & Yellow Auto rickshaw key. The pulse of Bhubaneswar college commute.',
    iconName: 'Car',
    detailModal: 'bus_ticket'
  },
  {
    id: 'grade_sheet',
    name: 'Semester Exam Paper',
    label: 'Mid-Sem Doodles',
    soundKey: 'radio',
    description: 'Unit-3 notes filled with coffee stains, diagrams, and emergency formula cheat sheets.',
    iconName: 'FileText',
    detailModal: 'grade_sheet'
  },
  {
    id: 'guitar_amp',
    name: 'Hostel Acoustic Guitar',
    label: 'Corridor Jam Guitar',
    soundKey: 'guitar',
    description: 'Strummed every night at 2 AM on the hostel terrace under Bhubaneswar stars.',
    iconName: 'Music',
  }
];

export const POLAROID_MEMORIES: MemoryPolaroid[] = [
  {
    id: 'p1',
    title: '5 PM Dahibara at Patia',
    date: 'Oct 14, 2019',
    location: 'Patia Square, BBSR',
    caption: 'Raghu Dada added extra Sev & spicy aloo dum broth. The ultimate student comfort food after 4 hours of lab classes!',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    category: 'Food',
    likes: 342
  },
  {
    id: 'p2',
    title: 'Monsoon Tea at Khoka Stall',
    date: 'July 22, 2020',
    location: 'Ghatikia Gate, BBSR',
    caption: 'Bhubaneswar rains, steaming Kulhad tea with friends, and debating about upcoming semester exams.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    category: 'Commute',
    likes: 289
  },
  {
    id: 'p3',
    title: '3 AM Hostel Corridor Maggi',
    date: 'Dec 03, 2019',
    location: 'Hostel 4, Room 210',
    caption: 'One electric kettle, 4 packets of Maggi, 9 friends sharing with plastic spoons. Best midnight meal ever.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    category: 'Hostel',
    likes: 412
  },
  {
    id: 'p4',
    title: 'Starry Night Cultural Fest',
    date: 'Feb 18, 2020',
    location: 'Open Air Auditorium',
    caption: 'Flashlights glowing in the dark, live band playing retro tunes, whole campus singing in unison.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    category: 'Fest',
    likes: 520
  },
  {
    id: 'p5',
    title: 'Puri Beach Bunk Ride',
    date: 'Nov 08, 2021',
    location: 'Puri Sea Beach Road',
    caption: 'Bunked Friday afternoon class, pooled ₹200 for scooty petrol, reached Puri beach before sunset!',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    category: 'Commute',
    likes: 398
  }
];

export const BBSR_SLANGS = [
  '“Bhai Kete Taka?”',
  '“Patia 20 Taka!”',
  '“Abe Thana!”',
  '“Seta Badhiya Thila!”',
  '“Dahibara re extra Sev pachar!”',
  '“Mass Bunk Confirm!”',
  '“Semester Result Out!”',
  '“Mo Bus No. 11 Asigala!”',
  '“Khoka Stall re Tea Break!”',
  '“1 Night Study Legend!”',
  '“Ghatikia Sunset Breeze!”'
];
