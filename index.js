import bodyParser from "body-parser";
import express from "express";
import ejs from "ejs";
import path from "path"
import { fileURLToPath } from "url"
import axios from "axios";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const yourBearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGNhMmZlZmI4YzkzMWQyMjEzOGZkYmRhZWExOWIwZCIsInN1YiI6IjY2NmI0YzM5Y2UwYmYzZWQ1YzA4MGEyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5w2kSF7rsJIhfoiTGGe9FEXsDwmyXzSXbWstWhcVu9o"
const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
}
const API_URL = "https://api.themoviedb.org/3/discover/movie";
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const API_URL2 = "https://api.themoviedb.org/3/trending/movie/week";
const API_URL3 = "https://api.themoviedb.org/3/movie/popular"

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (req,res)=>{
   res.render("index.ejs")
});

app.get("/movies",async (req,res)=>{
    try {
        const response = await axios.get(API_URL , {
            headers: { Authorization: `Bearer ${yourBearerToken}` },
            params:{
                with_genres: 28
            }
        });
        const result = response.data
        res.render("movies.ejs", {Movies:result.results, imgurl :TMDB_IMAGE_BASE_URL})

    } catch (error) {
        console.log (error)
    }
});
app.get("/trending",async(req,res)=>{
    try {
        const response=await axios.get(API_URL2,{
            headers: { Authorization: `Bearer ${yourBearerToken}` }
        });
        const result = response.data
        res.render("trending.ejs",{Movies:result.results, imgurl :TMDB_IMAGE_BASE_URL})
    } catch (error) {
        console.log(error)
    }
});
app.get("/popular",async (req,res)=>{
    try {
        const response = await axios.get(API_URL3,{
            headers: { Authorization: `Bearer ${yourBearerToken}` }
        });
        const result = response.data
        res.render("popular.ejs",{Movies:result.results, imgurl :TMDB_IMAGE_BASE_URL})
    } catch (error) {
        console.log(error)
    }
})

app.post("/search", async (req,res)=>{
    const query = req.body.query;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,{
        headers: { Authorization: `Bearer ${yourBearerToken}` },
    })
    const result = response.data
    res.render("search.ejs",{Movies:result.results, imgurl :TMDB_IMAGE_BASE_URL})
  } catch (error) {
    console.log (error)
  }
})

app.listen(port,()=>{
    console.log(`app is running on port ${3000}`)
});