export let visible = false
export let showContent = false

export async function startLesson(lesson) {
  const url = 'https://www.ukrge.site/api/get_lesson.php'
  const json = JSON.stringify({lesson: lesson})
  try {
      visible = true
      showContent = false
      let response = await fetch(url, {
          method: 'POST',
          body: json
      })
      let result = await response.json()
      if(result.info) {
          // this.lessonObj = result;
          return result
      } else alert('Урок №' + lesson + ' ще в розробці')
  } catch(error) {
      //console.log(error)
      alert('Щось пішло не так....')
  } finally {
    visible = false
    showContent = true
  }
}
export function showTextLoading () {
  visible = true
  showContent = false

  setTimeout(() => {
    visible = false
    showContent = true
  }, 500)
}
