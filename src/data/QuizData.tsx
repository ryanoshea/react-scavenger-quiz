import React from 'react';
import Emoji from '../components/Emoji';

export class Question {
    public answers: Set<string> | null;
    public constructor(public prompts: any[], answers: string[] | null = null) {
        this.answers = answers ? new Set(answers?.map(v => v.toLowerCase())) : null;
    }

    public get hasAnswers() {
        return this.answers != null;
    }

    public checkAnswer(answer: string): boolean {
        return answer != null && this.answers != null && this.answers.has(answer.trim().toLowerCase());
    }
}

export const QUESTIONS: Question[] = [
    new Question([
        <span>
            Welcome to your scavenger hunt! <Emoji char='🎁' desc='gift' />
        </span>,
        'This little app displays a series of questions to the player and expects them to find and type in the ' +
            'correct answer. It’s designed to be a simple, fun little activity during an occasion like a birthday.',
        <span>
            To get started, press the button. <Emoji char='✨' desc='sparkle' />
        </span>,
    ]),
    new Question(
        [
            'Write your own questions & answers to complete your quiz. Each one has a prompt (you’re reading it) and an answer.',
            'The correct answer to this question is ‘answer’. All answers are case insensitive.',
            'Questions can also accept multiple answers. This one also accepts ‘different answer’ — ' +
                'useful for making sure folks don’t get tripped up on spelling or nicknames.',
        ],
        ['Answer', 'Different answer']
    ),
    new Question(
        [
            'Quiz progress is auto-saved, so you can refresh the page or leave and come back to where you left off.',
            'You can reset your progress or backtrack through previous questions using the buttons below.',
            'It looks and works great on a smartphone too — perfect for carrying around during a scavenger hunt.',
            'This answer is ‘almost there’.',
        ],
        ['almost there']
    ),
    new Question(
        [
            <span>
                Questions can also be written with JSX for <em>rich text and content</em>.
            </span>,
            <img src='https://media.giphy.com/media/X8omQqfFyeq1a/giphy.gif' alt='rich' />,
            `This is the last question. The answer to this one is 'finish up'.`,
        ],
        ['finish up']
    ),
    new Question([
        `Congratulations, you’ve made it to the end!`,
        <span>
            <img
                src='https://media0.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif?cid=ecf05e4713fac7850c1adffcd065dfb44ddfa479ec5ee128&rid=giphy.gif'
                alt='Congrats!'
            />
        </span>,
        'This question has no answers array, so it’s treated as the end of the quiz and no answer box is presented.',
        'Ready to start customizing your quiz? Follow the instructions in the README!',
    ]),
];

class StartButtonEmoji {
    public constructor(public char: string, public desc: string) {}
}

export const START_BUTTON_EMOJIS: StartButtonEmoji[] = [
    { char: '🕵️', desc: 'detective' },
    { char: '👷‍♀️', desc: 'worker' },
    { char: '🧑‍⚕️', desc: 'doctor' },
    { char: '🧑‍🌾', desc: 'farmer' },
    { char: '🧑‍🍳', desc: 'chef' },
    { char: '🧑‍🎓', desc: 'student' },
    { char: '🧑‍🎤', desc: 'musician' },
    { char: '🧑‍🏫', desc: 'teacher' },
    { char: '🧑‍🏭', desc: 'welder' },
    { char: '🧑‍💻', desc: 'coder' },
    { char: '🧑‍💼', desc: 'executive' },
    { char: '🧑‍🔧', desc: 'mechanic' },
    { char: '🧑‍🔬', desc: 'chemist' },
    { char: '🧑‍🎨', desc: 'artist' },
    { char: '🧑‍🚀', desc: 'astronaut' },
    { char: '🧑‍⚖️', desc: 'judge' },
    { char: '🦸', desc: 'superhero' },
    { char: '🧝', desc: 'elf' },
    { char: '🦹', desc: 'villian' },
    { char: '🧛', desc: 'vampire' },
];
