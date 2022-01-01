import ChallengesTable from "./Tables/ChallengesTable";

const AdminAllChallenges = () => {
    const challenges = [
        {
            id: '1',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '2',
            name: 'challenge 2',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '3',
            name: 'challenge 3',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '4',
            name: 'challenge 4',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '5',
            name: 'challenge 1 this is the challnge to be be',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '6',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '7',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '8',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '9',
            name: 'challenge 1 this is the challnge to be be',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '10',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '11',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '12',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '13',
            name: 'challenge 1 this is the challnge to be be',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '14',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '15',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '16',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '17',
            name: 'challenge 1 this is the challnge to be be',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '18',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '19',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '20',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '21',
            name: 'challenge 1 this is the challnge to be be',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '22',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '23',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '24',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '25',
            name: 'challenge 1 this is the challnge to be be',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '26',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '27',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '28',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '29',
            name: 'challenge 1 this is the challnge to be be',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '30',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '31',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '32',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '33',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '34',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },{
            id: '35',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '36',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '37',
            name: 'challenge 1 this is the challnge to be be',
            description: 'Regional Paradigm Technician gffddfd dddd dfdg fdgdgd gfdgd fdgg dfgdre er tetrerte dg df' ,
            isPublic: true,
            language: 'js',
            participants: 103
        },
        {
            id: '38',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'java',
            participants: 103
        },
        {
            id: '39',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '40',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '41',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '42',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '43',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: true,
            language: 'java',
            participants: 103
        },
        {
            id: '44',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        },
        {
            id: '45',
            name: 'challenge 1',
            description: 'Regional Paradigm Technician',
            isPublic: false,
            language: 'js',
            participants: 103
        }
      ]
    return(
        <div className="h-full">
            <h1 className="text-left font-semibold text-xl mb-4">All Challenges</h1>
            <ChallengesTable challenges={challenges}/>
        </div>
    )
}

export default AdminAllChallenges;