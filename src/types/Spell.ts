// types.ts

export interface Spell {
    index: string;
    name: string;
    level: number;
    url: string;
    desc?: string[]; // Optional array of description strings
    higher_level?: string[]; // Optional array of strings for higher level details
    range: string;
    components: string[];
    material?: string; // Optional material string
    ritual: boolean;
    duration: string;
    concentration: boolean;
    casting_time: string;
    attack_type?: string; // Optional attack type string
    damage?: {
      damage_type: {
        index: string;
        name: string;
        url: string;
      };
      damage_at_slot_level: { [key: number]: string };
    };
    school: {
      index: string;
      name: string;
      url: string;
    };
    classes?: {
      index: string;
      name: string;
      url: string;
    }[];
    subclasses?: {
      index: string;
      name: string;
      url: string;
    }[];
  }
  