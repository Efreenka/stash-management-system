import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    document.title = "Domů"
  })

  return (
    <div className="text-center flex flex-col gap-5 py-8 px-7">
      <h1>Lorem ipsum</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis, enim autem! Facere corporis accusantium, quibusdam sunt nulla alias molestias corrupti, vero necessitatibus quisquam eum possimus tempora commodi similique, dolor quos.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis, enim autem! Facere corporis accusantium, quibusdam sunt nulla alias molestias corrupti, vero necessitatibus quisquam eum possimus tempora commodi similique, dolor quos.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis, enim autem! Facere corporis accusantium, quibusdam sunt nulla alias molestias corrupti, vero necessitatibus quisquam eum possimus tempora commodi similique, dolor quos.</p>
    </div>
  )
}

export default Home
