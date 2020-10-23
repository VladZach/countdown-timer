const time = document.querySelector(".time")
const endtime = document.querySelector(".endtime")
const buttons = document.querySelectorAll("[data-seconds]")
/* document.addMinutes.minutes.setCustomValidity('Minutes must be an integer') */
let interval

function timer(seconds) {
  clearInterval(interval)
  const now = Date.now()
  const then = now + (seconds * 1000)
  displayTime(seconds)
  displayEndTime(then)
  interval = setInterval(() => {
    const timeLeft = Math.round((then - Date.now()) / 1000)
    if (timeLeft < 0) {
      clearInterval(interval)
      return
    }
    displayTime(timeLeft)
  }, 1000)
}

function displayTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secondsLeft = seconds % 60
  time.textContent = `${minutes}:${secondsLeft >= 10 ? '' : '0'}${secondsLeft}`
}

function displayEndTime(seconds) {
  const end = new Date(seconds)
  const hours = end.getHours()
  const minutes = end.getMinutes()
  endtime.textContent = `Be back at ${hours}:${minutes >= 10 ? '' : '0'}${minutes}`
}

buttons.forEach(button => button.addEventListener('click', function () {
  const seconds = this.dataset.seconds
  timer(seconds)
}))

document.addMinutes.addEventListener('submit', function (e) {
  e.preventDefault()  
  const minutes = parseInt(this.minutes.value)
  if (!minutes) {
    alert('Minutes must be an integer')
    return
  }
  timer(minutes * 60)
})