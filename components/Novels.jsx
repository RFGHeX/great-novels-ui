import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Novel from './Novel'
import Search from './Search'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [novelList, setNovelList] = useState([])
  const [filterNovelList, setFilterNovelList] = useState([])

  useEffect(() => {
    async function retrieveData() {
      const { data } = await axios.get('http://localhost:1337/api/novels')

      setNovelList(data)
      setFilterNovelList(data)
    }

    retrieveData()
  }, [])

  useEffect(() => {
    const filtered = novelList.filter(novel => (
      novel.title.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    setFilterNovelList(filtered)
  }, [searchTerm])

  return (
    <div className="content">
      <h1>Great Novels</h1>
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filterNovelList.map(novel => (
          <Novel key={novel.id} name={`${novel.author.nameFirst} ${novel.author.nameLast}`} title={novel.title} />
        ))
      }
    </div>
  )
}
