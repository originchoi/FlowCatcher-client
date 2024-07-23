import { Session, Node, Link, ProcessedData } from "src/types/utils";

function processPageViewData(sessions: Session[]): ProcessedData {
  const nodes: Node[] = [];
  const links: Link[] = [];
  const linkCounts: { [key: string]: number } = {};
  const visitCounts: { [key: string]: number } = {};
  const exitCounts: { [key: string]: number } = {};
  const refreshCounts: { [key: string]: number } = {};

  sessions.forEach((session) => {
    session.pageViews.forEach((pageView, index) => {
      if (!visitCounts[pageView.url]) {
        visitCounts[pageView.url] = 1;
      } else {
        visitCounts[pageView.url] += 1;
      }

      let node = nodes.find((n) => n.id === pageView.url);

      if (!node) {
        node = {
          id: pageView.url,
          pageTitle: pageView.pageTitle,
          referrer: pageView.referrer,
          timestamp: pageView.timestamp,
          visitCounts: visitCounts[pageView.url],
          exitCounts: 0,
          refreshCount: 0,
        };

        nodes.push(node);
      }

      if (!session.isActive && index === session.pageViews.length - 1) {
        if (!exitCounts[pageView.url]) {
          exitCounts[pageView.url] = 1;
        } else {
          exitCounts[pageView.url] += 1;
        }

        node.exitCounts = exitCounts[pageView.url];
      }

      if (index < session.pageViews.length - 1) {
        const source = pageView.url;
        const target = session.pageViews[index + 1].url;
        const linkKey = `${source}-${target}`;

        if (!linkCounts[linkKey]) {
          linkCounts[linkKey] = 1;
          links.push({
            source,
            target,
            isSelfLoop: source === target,
            count: 1,
          });
        } else {
          linkCounts[linkKey] += 1;

          const linkIndex = links.findIndex(
            (link) => link.source === source && link.target === target,
          );

          if (linkIndex !== -1) {
            links[linkIndex].count = linkCounts[linkKey];
          }
        }

        if (source === target) {
          if (!refreshCounts[source]) {
            refreshCounts[source] = 1;
          } else {
            refreshCounts[source] += 1;
          }

          const nodeIndex = nodes.findIndex((n) => n.id === source);

          if (nodeIndex !== -1) {
            nodes[nodeIndex].refreshCount = refreshCounts[source];
          }
        }
      }
    });
  });

  nodes.forEach((node) => {
    node.visitCount = visitCounts[node.id];
  });

  return { nodes, links };
}

export default processPageViewData;
