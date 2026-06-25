export default function sitemap() {
  const baseUrl = 'https://www.drivio.co.in';
  
  // Static Routes
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic Fleet Cars Routes
  const carIds = ['scorpio-n', 'thar', 'swift', 'ertiga', 'verna', 'baleno'];
  const dynamicCarPages = carIds.map((id) => ({
    url: `${baseUrl}/cars/${id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...dynamicCarPages];
}
