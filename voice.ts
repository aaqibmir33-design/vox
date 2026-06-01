export interface VoiceProfile {
  id: string;
  name: string;
  description: string;
  avatar: string;
  accent: string;
  gender: 'male' | 'female' | 'neutral';
  age: string;
  language: string;
  quality: number;
  clones: number;
  createdAt: string;
  status: 'active' | 'training' | 'ready' | 'error';
  tags: string[];
  sampleDuration: number;
  lastUsed: string;
}

export interface AudioClip {
  id: string;
  voiceId: string;
  text: string;
  duration: number;
  url: string;
  createdAt: string;
  status: 'generating' | 'ready' | 'error';
  waveform: number[];
}

export interface VoiceCloneJob {
  id: string;
  name: string;
  status: 'uploading' | 'processing' | 'training' | 'completed' | 'failed';
  progress: number;
  samples: number;
  totalDuration: number;
  estimatedTime: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
}

export interface StudioSession {
  id: string;
  voiceId: string;
  text: string;
  settings: VoiceSettings;
  createdAt: string;
  outputs: AudioClip[];
}

export interface VoiceSettings {
  stability: number;
  clarity: number;
  speed: number;
  pitch: number;
  emotion: 'neutral' | 'happy' | 'sad' | 'angry' | 'excited' | 'calm';
  style: 'conversational' | 'narrative' | 'professional' | 'dramatic';
}

export interface DashboardStats {
  totalVoices: number;
  totalClips: number;
  totalDuration: number;
  activeJobs: number;
  creditsUsed: number;
  creditsTotal: number;
}

export type TabId = 'dashboard' | 'studio' | 'voices' | 'library' | 'settings';
