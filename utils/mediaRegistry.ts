
// 自动加载媒体文件的工具类
// 它可以扫描指定文件夹下的所有图片和视频

// 1. 项目作品 (Projects)
// 路径规则: src/assets/projects/<项目ID>/<任意文件名>
const projectFiles = import.meta.glob('/src/assets/projects/**/*.{png,jpg,jpeg,gif,webp,mp4,webm,mov}', { 
  eager: true, 
  query: '?url', 
  import: 'default' 
});

// 2. 还原度档案 (Comparison)
// 路径规则: src/assets/comparison/<项目ID>/<real或render>.<后缀>
const comparisonFiles = import.meta.glob('/src/assets/comparison/**/*.{png,jpg,jpeg,gif,webp,mp4,webm,mov}', { 
  eager: true, 
  query: '?url', 
  import: 'default' 
});

// 3. Something Else
// 路径规则: src/assets/something-else/<任意文件名>
const somethingElseFiles = import.meta.glob('/src/assets/something-else/*.{png,jpg,jpeg,gif,webp,mp4,webm,mov}', { 
  eager: true, 
  query: '?url', 
  import: 'default' 
});

// 4. Hero Background / Cover Image
// 路径规则: src/assets/cover/ 下的任意文件，或者 src/assets/hero-bg.*，或者 src/assets/N1.*
const coverFiles = import.meta.glob(['/src/assets/cover/*.{mp4,webm,mov,png,jpg,jpeg,webp}', '/src/assets/hero-bg.{mp4,webm,mov,png,jpg,jpeg,webp}', '/src/assets/N1.{mp4,webm,mov,png,jpg,jpeg,webp}'], { 
  eager: true, 
  query: '?url', 
  import: 'default' 
});

// 5. About / Founder Image
// 路径规则: src/assets/about/ 下的任意文件，或者 src/assets/S1.*
const aboutFiles = import.meta.glob(['/src/assets/about/*.{png,jpg,jpeg,webp}', '/src/assets/S1.{png,jpg,jpeg,webp}'], { 
  eager: true, 
  query: '?url', 
  import: 'default' 
});

// 6. Factory Traces (工厂痕迹)
// 路径规则: src/assets/factory-traces/D*.{png,jpg,jpeg,gif,mp4,webm,mov}
const factoryFiles = import.meta.glob('/src/assets/factory-traces/*.{png,jpg,jpeg,gif,webp,mp4,webm,mov}', { 
  eager: true, 
  query: '?url', 
  import: 'default' 
});

/**
 * 获取指定项目的媒体文件列表
 * @param projectId 项目ID (如 'p1', 'p2')
 */
export const getProjectMedia = (projectId: string): string[] => {
  const media = Object.keys(projectFiles)
    .filter(path => path.includes(`/projects/${projectId}/`))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })) // 按文件名自然排序 (支持 1, 2, 10)
    .map(path => projectFiles[path] as string);
    
  return media;
};

/**
 * 获取指定对比项目的渲染图和实景图
 * @param comparisonId 对比项目ID (如 'c1')
 */
export const getComparisonMedia = (comparisonId: string) => {
  const files = Object.keys(comparisonFiles).filter(path => path.includes(`/comparison/${comparisonId}/`));
  
  // 查找规则：
  // Render (渲染图): 文件名包含 'render' 或 'a' (如 A1.jpg)
  // Real (实景图): 文件名包含 'real' 或 'b' (如 B1.jpg)
  // 注意：这里使用正则匹配文件名部分，避免匹配到路径中的其他字符
  
  const getFileName = (path: string) => path.split('/').pop()?.toLowerCase() || '';

  const realPath = files.find(f => {
    const name = getFileName(f);
    return name.includes('real') || name.includes('b');
  });
  
  const renderPath = files.find(f => {
    const name = getFileName(f);
    return name.includes('render') || name.includes('a');
  });

  return {
    real: realPath ? (comparisonFiles[realPath] as string) : '',
    render: renderPath ? (comparisonFiles[renderPath] as string) : ''
  };
};

/**
 * 获取 Something Else 板块的所有媒体文件
 */
export const getSomethingElseMedia = (): string[] => {
  return Object.keys(somethingElseFiles)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })) // 按文件名自然排序 (支持 91, 92, 910)
    .map(path => somethingElseFiles[path] as string);
};

/**
 * 获取 Hero/Cover 背景媒体文件
 * 优先读取 src/assets/cover/ 下的文件，如果没有则读取 src/assets/hero-bg.* 或 src/assets/N1.*
 */
export const getCoverMedia = (): string | undefined => {
  const paths = Object.keys(coverFiles);
  // 优先找 N1
  const n1Path = paths.find(p => p.includes('/src/assets/N1.'));
  if (n1Path) return coverFiles[n1Path] as string;

  // 其次找 src/assets/cover 下的
  const coverPath = paths.find(p => p.includes('/src/assets/cover/'));
  if (coverPath) return coverFiles[coverPath] as string;
  
  // 否则找 hero-bg
  if (paths.length > 0) return coverFiles[paths[0]] as string;
  
  return undefined;
};

/**
 * 获取 About/Founder 图片
 * 读取 src/assets/about/ 下的文件，或 src/assets/S1.*
 */
export const getAboutMedia = (): string | undefined => {
  const paths = Object.keys(aboutFiles);
  // 优先找 S1
  const s1Path = paths.find(p => p.includes('/src/assets/S1.'));
  if (s1Path) return aboutFiles[s1Path] as string;

  if (paths.length > 0) {
    return aboutFiles[paths[0]] as string;
  }
  return undefined;
};

/**
 * 获取 Factory Traces 板块的所有媒体文件
 */
export const getFactoryMedia = (): string[] => {
  return Object.keys(factoryFiles)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })) // 按文件名自然排序 (支持 D1, D2, D10)
    .map(path => factoryFiles[path] as string);
};
