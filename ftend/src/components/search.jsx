import React, { useState } from 'react';
import './search.css';
import Nav from './nav';
import API from '../auth';

function Search() {
  const [searchType, setSearchType] = useState('area'); // default
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchInput) return;

    let url = '';
    if (searchType === 'area') url = `/r/area/${searchInput}`;
    else if (searchType === 'food') url = `/r/food/${searchInput}`;
    else if (searchType === 'location') url = `/r/city/${searchInput}`;

    try {
      const res = await API.get(url);
      setResults(res.data.data);
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
    }
  };

  return (
    <div>
      <Nav />
      <div className='wr'>
        <div className='con'>
          <h3>Search Area!!</h3>
         <div className='ss'>
  <button
    className={`sss ${searchType === 'area' ? 'selected' : ''}`}
    onClick={() => setSearchType('area')}
  >
    By Area
  </button>
  <button
    className={`sss ${searchType === 'food' ? 'selected' : ''}`}
    onClick={() => setSearchType('food')}
  >
    By Food
  </button>
  <button
    className={`sss ${searchType === 'location' ? 'selected' : ''}`}
    onClick={() => setSearchType('location')}
  >
    By Location
  </button>
</div>

          <div className='rr'>
            <input
              className='i'
              type="text"
              placeholder='Search...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className='b' onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      {/* Show results */}
      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {results.map(review => (
          <div
            key={review._id}
            className="w-[300px] bg-white border border-gray-300 rounded-lg shadow-md"
          >
            <img
              className="h-[200px] w-full object-cover rounded-t-lg"
              src={`http://localhost:3000/api/v1/r/image/${review.image}`}
              alt={review.resname}
            />
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                {review.resname}
              </h5>
              <p><strong>Area:</strong> {review.area}</p>
              <p><strong>City:</strong> {review.city}</p>
              <p><strong>Food Tried:</strong> {review.food}</p>
              <p><strong>Review:</strong> {review.reviewContent}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
