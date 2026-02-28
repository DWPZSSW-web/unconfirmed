import { Project, ProjectCategory, ComparisonItem } from './types';
import { getProjectMedia, getComparisonMedia, getAboutMedia } from './utils/mediaRegistry';

/**
 * ============================================================
 * 【媒体文件指南】
 * ============================================================
 * 
 * 1. 首页封面 (Hero): 上传到 /src/assets/cover/
 * 2. 个人照片 (About): 上传到 /src/assets/about/
 * 3. 项目图片: 上传到 /src/assets/projects/p1/, /src/assets/projects/p2/ 等
 *    - 文件名建议使用数字或连字符，如 1.jpg, 2.jpg, p1-1.jpg
 *    - 系统会自动按文件名排序
 * 
 * ============================================================
 */

export const STUDIO_INFO = {
  name_en: "UNCONFIRMED",
  name_zh: "未被证实",
  full_name: "未被证实艺术设计工作室",
  slogan: "NATURE WILL NOT HELP MANKIND",
  slogan_sub: "未被证实，即为无限可能...",
  founded: "2021",
  philosophy: [
    "专注于探索意识，思想，行为，生存，以及自然之间的联动，用艺术装置将其表现。",
    "艺术装置的目的是为了与人构成对话，即为艺术装置应有人物性格，语言种类，包括情绪，精神，行为等拟人形态。"
  ],
  contact: {
    email: "dwpzssw@163.com", 
    phone: "17521630705",
    location: "Shanghai, China",
    address: "Shanghai, China",
    xiaohongshu: "@OutsiderArt老灰"
  }
};

export const FOUNDER_INFO = {
  name: "GRAY / 老灰", 
  title: "老灰",
  image: getAboutMedia() || "S1", 
  accolades: [
    "2019年环保艺术系列装置《未来者》计划发起人",
    "2021年环保艺术系列装置《惩戒》发起人",
    "2022《乘风破浪的姐姐》艺术装置合作设计师",
    "2022杭州ADM合作艺术家",
    "北京国际花植艺术节合作青年设计师"
  ]
};

// Helper to get cover image (first image or specific cover)
const getCover = (id: string, fallback: string) => {
  const media = getProjectMedia(id);
  // Try to find a file with 'cover' in name, otherwise first file
  const cover = media.find(m => m.toLowerCase().includes('cover')) || media[0];
  return cover || fallback;
};

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: '《心底的树》x时尚芭莎x乘风破浪的姐姐',
    category: ProjectCategory.SET_DESIGN,
    location: 'Hunan, China',
    year: '2022',
    imageUrl: getCover('p1', 'https://picsum.photos/seed/p1/1920/1080'), 
    gallery: getProjectMedia('p1').length > 0 ? getProjectMedia('p1') : [
      'https://picsum.photos/seed/p1-1/1920/1080',
      'https://picsum.photos/seed/p1-2/1920/1080',
      'https://picsum.photos/seed/p1-3/1920/1080',
      'https://picsum.photos/seed/p1-4/1920/1080',
    ]
  },
  {
    id: 'p2',
    title: '《守望》',
    category: ProjectCategory.INSTALLATION,
    location: 'Chongqing, GND',
    year: '2022',
    imageUrl: getCover('p2', 'https://picsum.photos/seed/p2/1920/1080'),
    gallery: getProjectMedia('p2').length > 0 ? getProjectMedia('p2') : [
      'https://picsum.photos/seed/p2-1/1920/1080',
      'https://picsum.photos/seed/p2-2/1920/1080',
      'https://picsum.photos/seed/p2-3/1920/1080',
      'https://picsum.photos/seed/p2-3/1920/1080',
    ]
  },
  {
    id: 'p3',
    title: '《首次对话系列》',
    category: ProjectCategory.INSTALLATION,
    location: 'Shenzhen / Chengdu',
    year: '2022',
    imageUrl: getCover('p3', 'https://picsum.photos/seed/p3/1920/1080'),
    gallery: getProjectMedia('p3').length > 0 ? getProjectMedia('p3') : [
      'https://picsum.photos/seed/p3-1/1920/1080',
      'https://picsum.photos/seed/p3-2/1920/1080',
    ]
  },
  {
    id: 'p4',
    title: '《思想贫瘠》',
    category: ProjectCategory.SCULPTURE,
    location: 'Location TBD',
    year: '2023',
    imageUrl: getCover('p4', 'https://picsum.photos/seed/p5/1920/1080'),
    gallery: getProjectMedia('p4').length > 0 ? getProjectMedia('p4') : [
      'https://picsum.photos/seed/p5-1/1920/1080',
      'https://picsum.photos/seed/p5-2/1920/1080',
    ]
  },
  {
    id: 'p5',
    title: '《戒》',
    category: ProjectCategory.INSTALLATION,
    location: 'Location TBD',
    year: '2023',
    imageUrl: getCover('p5', 'https://picsum.photos/seed/p4/1920/1080'),
    gallery: getProjectMedia('p5').length > 0 ? getProjectMedia('p5') : [
      'https://picsum.photos/seed/p4-1/1920/1080',
      'https://picsum.photos/seed/p4-2/1920/1080',
    ]
  },
  {
    id: 'p6',
    title: '《首次对话碳基生物》',
    category: ProjectCategory.PUBLIC_ART,
    location: 'Location TBD',
    year: '2023',
    imageUrl: getCover('p6', 'https://picsum.photos/seed/p6/1920/1080'),
    gallery: getProjectMedia('p6').length > 0 ? getProjectMedia('p6') : [
      'https://picsum.photos/seed/p6-1/1920/1080',
      'https://picsum.photos/seed/p6-2/1920/1080',
    ]
  }
];

// Helper for comparisons
const getComp = (id: string, fallbackReal: string, fallbackRender: string) => {
  const media = getComparisonMedia(id);
  return {
    real: media.real || fallbackReal,
    render: media.render || fallbackRender
  };
};

export const COMPARISONS: ComparisonItem[] = [
  {
    id: 'c1',
    title: '项目还原：守望',
    renderImage: getComp('c1', 'https://picsum.photos/seed/c1-real/1920/1080', 'https://picsum.photos/seed/c1-render/1920/1080?grayscale').render, 
    realImage: getComp('c1', 'https://picsum.photos/seed/c1-real/1920/1080', 'https://picsum.photos/seed/c1-render/1920/1080?grayscale').real,
    description: '通过高精度3D扫描与数控加工，实现了从数字模型到实体装置的1:1复刻。'
  },
  {
    id: 'c2',
    title: '项目还原：未来者',
    renderImage: getComp('c2', 'https://picsum.photos/seed/c2-real/1920/1080', 'https://picsum.photos/seed/c2-render/1920/1080?grayscale').render,
    realImage: getComp('c2', 'https://picsum.photos/seed/c2-real/1920/1080', 'https://picsum.photos/seed/c2-render/1920/1080?grayscale').real,
    description: '复杂的机械结构在最终落地时保持了设计稿中的精密感与力量感。'
  },
  {
    id: 'c3',
    title: '项目还原：惩戒',
    renderImage: getComp('c3', 'https://picsum.photos/seed/c3-real/1920/1080', 'https://picsum.photos/seed/c3-render/1920/1080?grayscale').render,
    realImage: getComp('c3', 'https://picsum.photos/seed/c3-real/1920/1080', 'https://picsum.photos/seed/c3-render/1920/1080?grayscale').real,
    description: '光影效果的精确计算，使得现场氛围完美还原了概念设计。'
  },
  {
    id: 'c4',
    title: '项目还原：共生',
    renderImage: getComp('c4', 'https://picsum.photos/seed/c4-real/1920/1080', 'https://picsum.photos/seed/c4-render/1920/1080?grayscale').render,
    realImage: getComp('c4', 'https://picsum.photos/seed/c4-real/1920/1080', 'https://picsum.photos/seed/c4-render/1920/1080?grayscale').real,
    description: '材质的选择与处理，让装置在自然光下呈现出预期的质感。'
  },
  {
    id: 'c5',
    title: '项目还原：虚空',
    renderImage: getComp('c5', 'https://picsum.photos/seed/c5-real/1920/1080', 'https://picsum.photos/seed/c5-render/1920/1080?grayscale').render,
    realImage: getComp('c5', 'https://picsum.photos/seed/c5-real/1920/1080', 'https://picsum.photos/seed/c5-render/1920/1080?grayscale').real,
    description: '悬浮结构的力学挑战被攻克，视觉上达到了设计中的轻盈感。'
  },
  {
    id: 'c6',
    title: '项目还原：回响',
    renderImage: getComp('c6', 'https://picsum.photos/seed/c6-real/1920/1080', 'https://picsum.photos/seed/c6-render/1920/1080?grayscale').render,
    realImage: getComp('c6', 'https://picsum.photos/seed/c6-real/1920/1080', 'https://picsum.photos/seed/c6-render/1920/1080?grayscale').real,
    description: '声音装置的互动反馈机制，在现场调试后达到了最佳体验。'
  }
];