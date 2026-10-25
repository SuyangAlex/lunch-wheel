import { Service, signal } from '@angular/core';

export const PRESETS: Record<string, string[]> = {
  '台式日常': ['雞腿便當', '排骨便當', '滷肉飯', '牛肉麵', '水餃', '炒飯'],
  '異國料理': ['拉麵', '咖哩飯', '越南河粉', '泰式河粉', '義大利麵'],
  '擺攤賣的': ['鮭魚便當', '豬里肌便當', '雞肉飯便當', '雞胸肉便當'],
};

export interface HistoryEntry {
  dish: string;
  time: string;
}

@Service()
export class LunchService {
  items = signal<string[]>([...PRESETS['台式日常']]);
  history = signal<HistoryEntry[]>([]);
  noRepeat = signal(false);


  add(name: string) {
    name = name.trim();
    if (!name || this.items().includes(name)) return;
    this.items.update(list => [...list, name]);
  }
  
  usePreset(name: string) {
    this.items.set([...PRESETS[name]]);
  }

  remove(index: number) {
    this.items.update(list => list.filter((_, i) => i !== index));
  }
}