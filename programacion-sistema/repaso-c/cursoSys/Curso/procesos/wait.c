#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    int result = fork();

    if (result < 0) {
        printf("llamada a fork ha fallado\n");
        exit(-1);
    }

    if (result != 0) {
        wait(NULL);
        printf("Salida ps:\n");
        execlp("ps", "ps");
    } else {
        printf("Salida ls:\n");
        execlp("ls", "ls");
        printf("Ha habido un error..\n");
    }
}
