export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  stats: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface DemoResponse {
  analysis: string;
  steps: string[];
}