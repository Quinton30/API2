import { Request, Response } from 'express';
import pool from '../../db';
import * as queries from './queries';
import { QueryResult } from 'pg';

export const getMovies = (req: Request, res: Response) => {
  pool.query(queries.getMovies, (error: Error, results: QueryResult) => {
    if (error) {
      throw error;
    }
    return res.status(200).json(results.rows);
  });
};

export const getMovieById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  pool.query(queries.getMovieById, [id], (error: Error, results: QueryResult) => {
    if (error) throw error;
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.status(200).json(results.rows[0]);
  });
};

export const addMovie = (req: Request, res: Response) => {
  const { title, genre, release_year, director, rating } = req.body;
  if (!title || !genre || !release_year || !rating) {
    return res.status(400).json({ error: 'All fields except director are required' });
  }
  const year = parseInt(release_year, 10);
  const numericRating = parseFloat(rating);
  if (isNaN(year) || year < 1888 || year > new Date().getFullYear()) {
    return res.status(400).json({ error: 'Invalid release year' });
  }
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 9.9) {
    return res.status(400).json({ error: 'Rating must be between 1 and 9.9' });
  }
  if (typeof title !== 'string' || title.trim().length < 2) {
    return res.status(400).json({ error: 'Title must be at least 2 characters' });
  }
  if (typeof genre !== 'string' || genre.trim().length < 2) {
    return res.status(400).json({ error: 'Genre must be at least 2 characters' });
  }
  const processedDirector = director && typeof director === 'string' ? director.trim() : null;
  pool.query(
    queries.addMovie,
    [title.trim(), genre.trim(), year, processedDirector, numericRating],
    (error: Error, results: QueryResult) => {
      if (error) throw error;
      return res.status(201).json(results.rows[0]);
    }
  );
};

export const updateMovie = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { title, genre, release_year, director, rating } = req.body;
  if (!title || !genre || !release_year || !rating) {
    return res.status(400).json({ error: 'All fields except director are required' });
  }
  const year = parseInt(release_year, 10);
  const numericRating = parseFloat(rating);
  if (isNaN(year) || year < 1888 || year > new Date().getFullYear()) {
    return res.status(400).json({ error: 'Invalid release year' });
  }
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 9.9) {
    return res.status(400).json({ error: 'Rating must be between 1 and 9.9' });
  }
  if (typeof title !== 'string' || title.trim().length < 2) {
    return res.status(400).json({ error: 'Title must be at least 2 characters' });
  }
  if (typeof genre !== 'string' || genre.trim().length < 2) {
    return res.status(400).json({ error: 'Genre must be at least 2 characters' });
  }
  const processedDirector = director && typeof director === 'string' ? director.trim() : null;
  pool.query(
    queries.updateMovie,
    [title.trim(), genre.trim(), year, processedDirector, numericRating, id],
    (error: Error, results: QueryResult) => {
      if (error) throw error;
      return res.status(200).json({ message: 'Movie updated successfully' });
    }
  );
};
