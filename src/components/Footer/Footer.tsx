import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
        <div className="flex items-center justify-center">
            <a href={`https://github.com/alima987`} className="hover:text-gray-400">
                <p className="text-2xl">
                    <FaGithub />
                </p>
            </a>
            <p className="ml-2">&copy; 2024</p>
        </div>
    </footer>
    );
}

export default Footer;




