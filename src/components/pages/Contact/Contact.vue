<template>
    <v-card-title class="text-center text-h4 text-md-h5 text-lg-h3 mt-16">Contact us</v-card-title>
    <v-card-text class="text-center text-h6">Have a question or feedback? We'd love to hear from you! Get in touch with
        us using the contact information below or fill out the form, and we'll get back to you as soon as possible.
        <p>Thank you for reaching out to us!</p>
    </v-card-text>
    <v-container>

        <v-row v-if="isFormSent" align="center" justify="center">
            <v-col cols="12" lg="12">
                <v-card class="mx-auto my-8 w-100 pa-3" elevation="10" max-width="500">
                    <v-card-item class="pa-2 pl-4" align="center">
                        <v-card-title>Sent!</v-card-title>
                    </v-card-item>
                    <RouterLink to="/">
                        <v-btn class="btn" color="success" @click="toggleMessage">
                     Go Home page
                        </v-btn>
                    </RouterLink>
                </v-card>
            </v-col>
        </v-row>

        <v-row align="center" justify="center">
            <v-col cols="12" lg="6" md="6" sm="8" xs="12">
                <v-sheet class="mx-auto">
                    <v-form ref="form">
                        <v-text-field v-model.trim="name" :rules="nameRules" label="Name" required></v-text-field>
                        <v-text-field v-model="email" :rules="emailRules" label="Email" required
                            type="email"></v-text-field>
                        <v-textarea label="Message" v-model.trim="message"></v-textarea>

                        <div class="d-flex flex-column">
                            <v-btn class="mt-4" color="success" block @click="sendForm"> Send </v-btn>

                            <v-btn class="mt-4" color="error" block @click="reset"> Reset Form </v-btn>
                        </div>
                    </v-form>
                </v-sheet>
            </v-col>
        </v-row>

    </v-container>
</template>

<script src="./contact.js"></script>

<style scoped>
.v-card-title {
    color: green;
    font-style: italic;
    text-align: center;
}
.btn{
    width: 120px;
}

</style>