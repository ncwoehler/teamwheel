package de.nwoehler.teamwheel

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TeamwheelApplication

fun main(args: Array<String>) {
	runApplication<TeamwheelApplication>(*args)
}
