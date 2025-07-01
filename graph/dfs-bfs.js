/* DETECT CYCLE IN UNDIRECTED GRAPH USING BFS */
/**
 * @param {number} V
 * @param {number[][]} adj
 * @returns {boolean}
 */
class Solution {
  isCycle(V, edges) {
    let adj = new Array(V).fill(0).map(() => []);
    let vis = new Array(V).fill(false);

    for (let [src, dest] of edges) {
      adj[src].push(dest);
      adj[dest].push(src);
    }

    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        let queue = new Array();
        queue.push({ src: -1, dest: i });
        vis[i] = true;
        while (queue.length) {
          let { src, dest } = queue.shift();

          for (let neighbor of adj[dest]) {
            if (neighbor === src) continue; // skip the edge to parent
            if (vis[neighbor]) return true; // visited and not parent → cycle
            vis[neighbor] = true;
            queue.push({ src: dest, dest: neighbor });
          }
        }
      }
    }
    return false;
  }
}

/* DETECT CYCLE IN UNDIRECTED GRAPH USING DFS */
/**
 * @param {number} V
 * @param {number[][]} adj
 * @returns {boolean}
 */
class Solution {
  isCycle(V, edges) {
    let adj = new Array(V).fill(0).map(() => []);
    let vis = new Array(V).fill(false);

    for (let [src, dest] of edges) {
      adj[src].push(dest);
      adj[dest].push(src);
    }

    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        let stack = [];
        stack.push({ src: -1, dest: i });
        vis[i] = true;

        while (stack.length) {
          let { src, dest } = stack.pop();

          for (let neighbour of adj[dest]) {
            if (vis[neighbour] && neighbour != src) return true;
            if (neighbour != src) {
              stack.push({ src: dest, dest: neighbour });
              vis[neighbour] = true;
            }
          }
        }
      }
    }
    return false;
  }
}


/** 0/1 MATRIX */

// MY SOLUTION 
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
class MyQ{
  constructor(){
      this.item = {};
      this.front = 0;
      this.rear = 0;
  }
  enqueue(value){
      this.item[this.rear] = value;
      this.rear++;
  }
  dequeue(){
      if(this.isEmpty()) return null;
      const data = this.item[this.front];
      delete this.item[this.front];
      this.front++;
      return data;
  }
  isEmpty(){
      return this.front === this.rear;
  }
}
var updateMatrix = function(mat) {
  const m = mat.length;
  const n = mat[0].length;

  const ans = new Array(m).fill(0).map(() => new Array(n).fill(-1));
  const vis = new Array(m).fill(0).map(()=> new Array(n).fill(false));
  const q = new MyQ();
  const dir = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0]
  ];

  for(let i=0;i<m;i++){
      for(let j=0;j<n;j++){
          if(mat[i][j] === 0){
              vis[i][j] = true;
              q.enqueue({i,j,dist:0});
          }
      }
  }

  while(!q.isEmpty()){
      const {i,j,dist} = q.dequeue();
      ans[i][j] = dist;

      for(let [r,c] of dir){
          let cR = r+i, cC = c+j;
          if(cR >= 0 && cR < m && cC >= 0 && cC < n && !vis[cR][cC]){
              vis[cR][cC] = true;
              q.enqueue({i:cR,j:cC,dist:dist+1});
          }
      }
  }
  return ans;    
};


// OPTIMAL SOLUTION

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
  const m = mat.length;
  const n = mat[0].length;
  let queue = [];
  let dist = Array.from({length: m}, ()=>Array(n).fill(Infinity));

  for(let i=0; i<m; i++){
      for(let j=0; j<n; j++){
          if(mat[i][j] === 0){
              dist[i][j] = 0;
              queue.push([i,j]);
          }
      }
  }
  const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]];

  while(queue.length){
      const [i, j] = queue.shift();
      for(const [di, dj] of directions){
          const ni = di+i, nj = dj+j;
          if(ni>=0 && ni<m && nj>=0 && nj<n){
              if(dist[ni][nj] > dist[i][j] + 1){
                  dist[ni][nj] = dist[i][j] + 1;
                  queue.push([ni, nj]);
              }
          }
      }
  }
  return dist;
};