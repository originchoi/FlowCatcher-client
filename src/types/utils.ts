export interface PageView {
  url: string;
  pageTitle: string;
  referrer: string;
  timestamp: string;
}

export interface Session {
  pageViews: PageView[];
  isActive: boolean;
}

export interface Node {
  id: string;
  pageTitle: string;
  referrer: string;
  timestamp: string;
  visitCounts: number;
  exitCounts: number;
  visitCount?: number;
  refreshCount: number;
}

export interface Link {
  source: string;
  target: string;
  isSelfLoop: boolean;
  count: number;
}

export interface ProcessedData {
  nodes: Node[];
  links: Link[];
}

export interface BarData {
  pageTitle: string;
  visitCount: number;
  isPlaceholder?: boolean;
}

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  pageTitle: string;
  referrer: string;
  timestamp: string;
  visitCounts: number;
  exitCounts: number;
  visitCount?: number;
  refreshCount: number;
  x: number;
  y: number;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: GraphNode | string;
  target: GraphNode | string;
  isSelfLoop: boolean;
  count: number;
}
