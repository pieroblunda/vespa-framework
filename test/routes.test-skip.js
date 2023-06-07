import dotenv from 'dotenv';
import Meanivan from '../framework/meanivan.js';
import DbClient from '../framework/dbclient.js';
import * as routes from '../server/routes.js';
import request from 'supertest';

let app;

beforeAll( () => {
  dotenv.config();
  Meanivan.setGlobals();
  process.env.DB_NAME = 'nexilia';
  app = routes.init();
  return DbClient.connect();
});

describe('Routes', () => {
  
  let routes = [
    {path: '/', matchExpression: 'text/html; charset=utf-8'},
    {path: '/contatti', matchExpression: 'text/html; charset=utf-8'},
    {path: '/archivio', matchExpression: 'text/html; charset=utf-8'},
    {path: '/search', matchExpression: 'text/html; charset=utf-8'},
    {path: '/robots.txt', matchExpression: 'text/plain; charset=utf-8'},
    {path: '/ads.txt', matchExpression: 'text/plain; charset=utf-8'},
    {path: '/sitemapnews', matchExpression: 'text/html; charset=UTF-8'},
    {path: '/sitemap_index.xml', matchExpression: 'text/xml; charset=UTF-8'},
    {path: '/post-sitemap2.xml', matchExpression: 'text/xml; charset=UTF-8'},
    {path: '/page-sitemap.xml', matchExpression: 'text/xml; charset=UTF-8'},
    {path: '/category-sitemap.xml', matchExpression: 'text/xml; charset=UTF-8'},
    {path: '/author-sitemap.xml', matchExpression: 'text/xml; charset=UTF-8'},
    // {path: '/feed', matchExpression: 'application/rss+xml; charset=UTF-8'},
    // {path: '/feed/facebook-instant-articles', matchExpression: 'text/html; charset=UTF-8'}
  ];
  
  // HTML routes
  routes.forEach((route, i) => {
    it(`Path ${route.path}`, async () => {
      return request(app).get(route.path).set('Accept', '*/*').then(response => {
        expect(response.status).toBe(200);
        // expect(response.headers['content-type']).toBe(route.matchExpression);
      });
    });
  });
  
  /* @ToDo: [1] /authors lo usa WeGirs, e ha senso per tutti i partner. Vogliamo far diventare uno standard? */
  it.skip('/authors', () => {});
  
  it.skip('/author/nexilia', () => {});
  it.skip('/category/nexilia', () => {});
  it.skip('/tag/nexilia', () => {});
  it.skip('/nexilia', () => {});
  it.skip('/nexilia/amp', () => {});
  
  // it.skip('Must return a page results searching -%20- (space)', () => {});
  // it.skip('Must return a page results searching -italia- (single word)', () => {});
  // it.skip('Must return a page results searching -italia%20roma- (many words)', () => {});
  
});

afterAll( () => {
  DbClient.closeConnection();
});
