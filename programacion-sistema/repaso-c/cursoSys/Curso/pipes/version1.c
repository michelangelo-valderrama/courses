#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>

int main(int argc, char **argv) {
    int pipe1[2];
    pipe(pipe1);

    if (fork()) {
        // cut
        close(pipe1[1]);
        close(0);
        dup(pipe1[0]);
        close(pipe1[0]);

        execlp("cut", "cut", "-c5-12", NULL);
        printf("Error cut\n");
    } else {
        // ps
        close(pipe1[0]);
        close(1);
        dup(pipe1[1]);
        close(pipe1[1]);

        execlp("ps", "ps", "-efl", NULL);
        printf("Error ps\n");
    }
}
