export type FolderId = "profile" | "skills" | "projects" | "contact";

export type FolderItem = {
  id: FolderId;
  title: string;
  items: number;
};

export type FolderContent = {
  title: string;
  subtitle: string;
  description: string;
  items: string[];
};

export type PortfolioWindowType = "finder" | "folder";

export type PortfolioWindow = {
  id: string;
  type: PortfolioWindowType;
  title: string;
  zIndex: number;
  x: number;
  y: number;
  folderId?: FolderId;
};