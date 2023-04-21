-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2023 at 01:03 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `php_auth_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(225) NOT NULL,
  `title` varchar(1500) NOT NULL,
  `type` varchar(1500) NOT NULL,
  `start_date` varchar(1500) NOT NULL,
  `estimate_end_date` varchar(1500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `type`, `start_date`, `estimate_end_date`) VALUES
(5, 'Banking Api', 'Development', '2023-04-21', '2023-04-28'),
(6, 'Investing API', 'Testing', '2023-04-22', '2023-05-01');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `project_id` int(225) NOT NULL,
  `title` varchar(2000) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `priority` varchar(2000) NOT NULL,
  `assign` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `project_id`, `title`, `description`, `priority`, `assign`) VALUES
(29, 6, 'Testing for investment accounts', 'functional testing', 'medium', 'ravali@gmail.com'),
(30, 6, 'Investments integration with 3rd party apps', 'Integration testing', 'medium', 'yashpreet@gmail.com'),
(31, 6, 'Investments non functional testing', 'non functional testing', 'medium', 'nithya@gmail.com'),
(33, 5, 'Integrate accounts data', 'Integrate the existing users accounts data', 'high', 'yashpreet@gmail.com'),
(34, 5, 'Generate the banking reports', 'Create the feature for getting the banking reports weekly, monthly, quarterly, yearly', 'high', 'nithya@gmail.com'),
(35, 5, 'Create Login and resgistration for banking users', 'Create frontend and integrate it with the backend', 'high', 'surbhi@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(25) NOT NULL,
  `name` varchar(1500) NOT NULL,
  `email` varchar(1500) NOT NULL,
  `password` varchar(1500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(15, 'admin', 'admin@gmail.com', '$2y$10$j6uUY8TGNbfusvO0xK3dzeduN4VKpzP.0.p3E63cujIYCcSRKN0qy'),
(16, 'Ravali velpuri', 'ravali@gmail.com', '$2y$10$AEDJU5VYfGyvO7G1Yp0i1e7j2nTD/TowS6bdJdIksmoBZPd3mr7pG'),
(17, 'yashpreet Singh', 'yashpreet@gmail.com', '$2y$10$vL7J59xBkDaQ0mykVkQLGefwhboJYyNWPCygGmQD0jTZbUblbl7ra'),
(18, 'Nithya Anandan', 'nithya@gmail.com', '$2y$10$wlHnt8C6RnkC1F3NTvlL5O0yqs3rwEv07QfmqoGCKh8ilrULOFyL.'),
(19, 'Surbhi Bhat', 'surbhi@gmail.com', '$2y$10$ng97NUiYMX0gSxijLNBVp.IWrcyz6RjTNjt30QVTINo.4R0NYGYu6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
