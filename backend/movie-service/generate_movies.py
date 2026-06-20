import json
import random
from datetime import datetime, timedelta

def generate_movies():
    movies = []
    
    genres_pool = [
        {"name": "Action"}, {"name": "Sci-Fi"}, {"name": "Drama"}, 
        {"name": "Thriller"}, {"name": "Comedy"}, {"name": "Adventure"},
        {"name": "Horror"}, {"name": "Fantasy"}, {"name": "Romance"},
        {"name": "Animation"}
    ]
    
    directors_pool = ["Christopher Nolan", "Steven Spielberg", "Denis Villeneuve", "Quentin Tarantino", "Martin Scorsese", "Greta Gerwig", "James Cameron", "Peter Jackson"]
    actors_pool = ["Tom Cruise", "Leonardo DiCaprio", "Cillian Murphy", "Zendaya", "Timothée Chalamet", "Margot Robbie", "Ryan Gosling", "Robert Downey Jr.", "Scarlett Johansson", "Brad Pitt"]

    # Use valid UUIDs for the first two movies so we can link them in theatre-service
    known_uuids = [
        "11111111-1111-1111-1111-111111111111",
        "22222222-2222-2222-2222-222222222222",
        "33333333-3333-3333-3333-333333333333",
        "44444444-4444-4444-4444-444444444444",
        "55555555-5555-5555-5555-555555555555"
    ]

    base_movies = [
        {"title": "Dune: Part Two", "synopsis": "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.", "poster": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop", "imdb": 8.8, "rt": "97%", "genres": [1, 5], "cast": [4, 3], "dir": 2},
        {"title": "Oppenheimer", "synopsis": "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", "poster": "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop", "imdb": 8.4, "rt": "93%", "genres": [2, 3], "cast": [2, 7], "dir": 0},
        {"title": "Top Gun: Maverick", "synopsis": "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.", "poster": "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1000&auto=format&fit=crop", "imdb": 8.3, "rt": "96%", "genres": [0, 2], "cast": [0], "dir": 1},
        {"title": "Barbie", "synopsis": "Barbie suffers a crisis that leads her to question her world and her existence.", "poster": "https://images.unsplash.com/photo-1518063250682-1a42337a76c8?q=80&w=1000&auto=format&fit=crop", "imdb": 7.0, "rt": "88%", "genres": [4, 7], "cast": [5, 6], "dir": 5},
    ]

    for i in range(40):
        if i < len(base_movies):
            bm = base_movies[i]
            title = bm["title"]
            synopsis = bm["synopsis"]
            posterUrl = bm["poster"]
            imdb = bm["imdb"]
            rt = bm["rt"]
            movie_genres = [genres_pool[g] for g in bm["genres"]]
            crew = [{"name": directors_pool[bm["dir"]], "role": "Director", "photoUrl": ""}]
            for a in bm["cast"]:
                crew.append({"name": actors_pool[a], "role": "Actor", "photoUrl": ""})
        else:
            title = f"Cinematic Masterpiece {i+1}"
            synopsis = f"An unforgettable journey into the unknown where characters face their deepest fears in chapter {i+1}."
            posterUrl = f"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop&sig={i}"
            imdb = round(random.uniform(5.0, 9.5), 1)
            rt = f"{random.randint(40, 99)}%"
            movie_genres = random.sample(genres_pool, k=2)
            crew = [
                {"name": random.choice(directors_pool), "role": "Director", "photoUrl": ""},
                {"name": random.choice(actors_pool), "role": "Actor", "photoUrl": ""},
                {"name": random.choice(actors_pool), "role": "Actor", "photoUrl": ""}
            ]

        movie = {
            "title": title,
            "synopsis": synopsis,
            "releaseDate": (datetime.now() - timedelta(days=random.randint(10, 365))).strftime("%Y-%m-%d"),
            "runtimeMins": random.randint(90, 180),
            "posterUrl": posterUrl,
            "bannerUrl": "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
            "status": "NOW_SHOWING",
            "imdbRating": imdb,
            "rottenTomatoesRating": rt,
            "genres": movie_genres,
            "crew": crew
        }
        
        if i < len(known_uuids):
            movie["id"] = known_uuids[i]

        movies.append(movie)

    with open("src/main/resources/movies.json", "w") as f:
        json.dump(movies, f, indent=2)

if __name__ == "__main__":
    generate_movies()
    print("movies.json generated with 40 movies and valid UUIDs.")
