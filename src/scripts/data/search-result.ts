import { DataNode, NodeScoreData } from '@proj-types/types';

// Following weights are also used as identifiers also.
enum MATCH_TYPE {
  // FULL MATCHES
  // fulLtag = 0, // Not using tags currently
  fulLurl = 16,
  fulLnam = 5, // for bookmark link titles.
  fulLfol = 7, // for folder names

  // PARTIAL MATCHES
  // parTtag = 0, // Not using tags
  parTfol = 3,
  parTnam = 2,
  parTurl = 1
}

class NodeScore implements NodeScoreData {
  constructor(
    public node: DataNode,
    // public fulLtag = 0,
    public fulLfol = 0,
    public fulLnam = 0,
    public fulLurl = 0,
    // public parTtag = 0,
    public parTfol = 0,
    public parTnam = 0,
    public parTurl = 0,
    private _totalScore = 0
  ) {}

  // prettier-ignore
  public incScoreCount(type: MATCH_TYPE, count=1) {
    switch(type){
      // case MATCH_TYPE.fulLtag: this.fulLtag+=count; break;
      case MATCH_TYPE.fulLurl: this.fulLurl+=count; break;
      case MATCH_TYPE.fulLnam: this.fulLnam+=count; break;
      case MATCH_TYPE.fulLfol: this.fulLfol+=count; break;

      // case MATCH_TYPE.parTtag: this.parTtag+=count; break;
      case MATCH_TYPE.parTurl: this.parTurl+=count; break;
      case MATCH_TYPE.parTnam: this.parTnam+=count; break;
      case MATCH_TYPE.parTfol: this.parTfol+=count; break;
    }
  }

  public get score(): number {
    return (
      this._totalScore ||
      (this._totalScore =
        // MATCH_TYPE.fulLtag * this.fulLtag +
        MATCH_TYPE.fulLurl * this.fulLurl +
        MATCH_TYPE.fulLnam * this.fulLnam +
        MATCH_TYPE.fulLfol * this.fulLfol +
        // MATCH_TYPE.parTtag * this.parTtag +
        MATCH_TYPE.parTurl * this.parTurl +
        MATCH_TYPE.parTnam * this.parTnam +
        MATCH_TYPE.parTfol * this.parTfol)
    );
  }
}

class Match {
  constructor(private _nodes = new Map<DataNode, number>()) {}

  public add(node: DataNode): void {
    this._nodes.set(node, (this._nodes.get(node) || 0) + 1);
  }

  public getAll(): [DataNode, number][] {
    return Array.from(this._nodes);
  }
}
class MatchTypes {
  constructor(
    // public tag = new Match(),
    public fol = new Match(),
    public nam = new Match(),
    public url = new Match()
  ) {}
}
class Matches {
  constructor(
    public partial = new MatchTypes(),
    public complete = new MatchTypes()
  ) {}
}
class SearchResult {
  private _scoredNodes: NodeScore[] | null = null;
  constructor(public query: string = '', public match = new Matches()) {}

  public matchNodesAndQueries(nodes: DataNode[], queries: string[]): void {
    for (let query of queries) {
      for (let node of nodes) {
        this.matchNodeAndQuery(node, query.toLowerCase());
      }
    }
  }

  public matchNodeAndQuery(node: DataNode, query: string): void {
    if (!query) return;

    const url: string =
      (node as any).urlLower ||
      ((node as any).urlLower = (node.url || '').toLowerCase());
    const title: string =
      (node as any).titleLower ||
      ((node as any).titleLower = node.title.toLowerCase());

    const urlComp = url === query,
      titleComp = title === query;
    const urlPart = !urlComp && url.indexOf(query) !== -1,
      titlePart = !titleComp && title.indexOf(query) !== -1;

    const addMatch = (type: MATCH_TYPE) => this.addMatch(node, type);

    urlComp && addMatch(MATCH_TYPE.fulLurl);
    urlPart && addMatch(MATCH_TYPE.parTurl);

    !node.url && titleComp && addMatch(MATCH_TYPE.fulLfol);
    node.url && titleComp && addMatch(MATCH_TYPE.fulLnam);

    !node.url && titlePart && addMatch(MATCH_TYPE.parTfol);
    node.url && titlePart && addMatch(MATCH_TYPE.parTnam);
  }

  public addMatch(node: DataNode, matchType: MATCH_TYPE) {
    // prettier-ignore
    switch(matchType){
      // case MATCH_TYPE.fulLtag: this.match.complete.tag.add(node); break;
      case MATCH_TYPE.fulLurl: this.match.complete.url.add(node); break;
      case MATCH_TYPE.fulLnam: this.match.complete.nam.add(node); break;
      case MATCH_TYPE.fulLfol: this.match.complete.fol.add(node); break;

      // case MATCH_TYPE.parTtag: this.match.partial.tag.add(node); break;
      case MATCH_TYPE.parTurl: this.match.partial.url.add(node); break;
      case MATCH_TYPE.parTnam: this.match.partial.nam.add(node); break;
      case MATCH_TYPE.parTfol: this.match.partial.fol.add(node); break;

      default:
        throw "Unknown match Type."
    }
  }

  public getNodesWithScores(): [string, NodeScore][] {
    const allNodes = new Map<string, NodeScore>();
    const addMatch = (node: DataNode, count: number, type: MATCH_TYPE) => {
      let score = allNodes.get(node.id);
      if (!score) {
        score = new NodeScore(node);
        allNodes.set(node.id, score);
      }
      score.incScoreCount(type, count);
    };

    // prettier-ignore
    {let part = this.match.partial, full = this.match.complete;
    // for(let score of part.tag.getAll()) addMatch(...score, MATCH_TYPE.parTtag);
    for(let score of part.url.getAll()) addMatch(...score, MATCH_TYPE.parTurl);
    for(let score of part.nam.getAll()) addMatch(...score, MATCH_TYPE.parTnam);
    for(let score of part.fol.getAll()) addMatch(...score, MATCH_TYPE.parTfol);
    // for(let score of full.tag.getAll()) addMatch(...score, MATCH_TYPE.fulLtag);
    for(let score of full.url.getAll()) addMatch(...score, MATCH_TYPE.fulLurl);
    for(let score of full.nam.getAll()) addMatch(...score, MATCH_TYPE.fulLnam);
    for(let score of full.fol.getAll()) addMatch(...score, MATCH_TYPE.fulLfol);}

    return Array.from(allNodes);
  }

  public get scoredNodes(): NodeScore[] {
    if (!this._scoredNodes) {
      this._scoredNodes = this.getNodesWithScores().map((el) => el[1]);
      this._scoredNodes.sort((a, b) => b.score - a.score);
    }
    return this._scoredNodes;
  }
}

export { SearchResult, MATCH_TYPE };
