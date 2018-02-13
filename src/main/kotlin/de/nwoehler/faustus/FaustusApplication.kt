package de.nwoehler.faustus

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FaustusApplication

fun main(args: Array<String>) {
    runApplication<FaustusApplication>(*args)
}
